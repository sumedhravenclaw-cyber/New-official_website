import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { db } from "@/lib/db";
import { sendMail } from "@/lib/mailer";
import { getAllCaseStudies, CASE_STUDIES_TAG } from "@/lib/case-studies";

/**
 * Backstop revalidation for the route handler itself. The tag invalidation in
 * POST is what actually makes a new study appear; this just bounds how stale
 * the response can get if a study is added by any other means (a direct DB
 * write, a seed script).
 */
export const revalidate = 3600;

export async function GET() {
  const caseStudies = await getAllCaseStudies();

  return NextResponse.json(
    { caseStudies },
    {
      headers: {
        // The client component on /case-studies fetches this on mount. Letting
        // the browser and CDN hold it briefly turns a repeat visit's refetch
        // into a cache hit, while stale-while-revalidate keeps a newly
        // published study from being more than a few minutes late.
        "Cache-Control":
          "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  );
}

export async function POST(request: Request) {
  try {
    const adminKey = request.headers.get("x-admin-key");
    if (!adminKey || adminKey !== process.env.ADMIN_API_KEY) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { slug, client, industry, summary, metric, metricLabel, image, content } = body;

    if (!slug || !client || !industry || !summary || !metric || !metricLabel || !image || !content) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    const existing = await db.caseStudy.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "A case study with that slug already exists." },
        { status: 409 }
      );
    }

    const created = await db.caseStudy.create({
      data: {
        slug,
        client,
        industry,
        summary,
        metric,
        metricLabel,
        image,
        content: JSON.stringify(content),
      },
    });

    // Publish the new study before notifying anyone about it. Without this the
    // study existed in the DB but was invisible everywhere: the cached query
    // still held the old set, and /case-studies/[slug] was prerendered from
    // generateStaticParams at build time, so subscribers would have been mailed
    // a link that 404s.
    // Next 16 requires an explicit expiry alongside the tag. `expire: 0` is a
    // hard purge — the next read misses and re-queries — which is what
    // publishing wants. (The object form is used rather than a named cacheLife
    // profile because the built-in profile names aren't part of the shipped
    // type surface, so a name would be an unchecked guess.)
    revalidateTag(CASE_STUDIES_TAG, { expire: 0 });
    revalidatePath("/case-studies");
    revalidatePath(`/case-studies/${slug}`);

    const subscribers = await db.newsletterSubscriber.findMany({
      select: { email: true },
    });

    let emailsSent = 0;
    if (subscribers.length > 0) {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
      await Promise.allSettled(
        subscribers.map((sub) =>
          sendMail({
            to: sub.email,
            subject: `New case study: ${client}`,
            html: `
              <p>We just published a new case study — <strong>${client}</strong>.</p>
              <p>${summary}</p>
              <p><a href="${siteUrl}/case-studies/${slug}">Read it here</a></p>
            `,
          })
        )
      ).then((results) => {
        emailsSent = results.filter((r) => r.status === "fulfilled").length;
      });
    }

    return NextResponse.json({
      success: true,
      message: `Case study created. Notified ${emailsSent} subscriber(s).`,
      caseStudy: created,
    });
  } catch (err) {
    console.error("Case study creation error:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
