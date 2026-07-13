import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendMail } from "@/lib/mailer";
import { getAllCaseStudies } from "@/lib/case-studies";

export async function GET() {
  const caseStudies = await getAllCaseStudies();
  return NextResponse.json({ caseStudies });
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
