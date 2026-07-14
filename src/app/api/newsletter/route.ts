import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendMail } from "@/lib/mailer";
import { getAllCaseStudies, caseStudiesEmailHtml } from "@/lib/case-studies";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    try {
      const existing = await db.newsletterSubscriber.findUnique({
        where: { email },
      });

      if (existing) {
        return NextResponse.json({
          success: true,
          message: "You're already subscribed — thanks!",
        });
      }

      await db.newsletterSubscriber.create({ data: { email } });
    } catch (dbErr) {
      // No database configured (e.g. free test deploy) — accept the signup
      // without persisting it so the flow still works end-to-end.
      console.warn("Newsletter DB unavailable, not persisting subscriber:", dbErr);
    }

    getAllCaseStudies()
      .then((studies) =>
        sendMail({
          to: email,
          subject: "You're subscribed to RavenClaw updates",
          html: caseStudiesEmailHtml(
            studies.slice(0, 3),
            process.env.NEXT_PUBLIC_SITE_URL ?? ""
          ),
        })
      )
      .catch((err) => console.error("Newsletter welcome email failed:", err));

    return NextResponse.json({
      success: true,
      message: "Subscribed! You'll hear from us when we publish new work.",
    });
  } catch (err) {
    console.error("Newsletter API error:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
