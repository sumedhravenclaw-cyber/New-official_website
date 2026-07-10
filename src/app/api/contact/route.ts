import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // In a real deployment you would forward this to an email service
    // (Resend, SendGrid, Web3Forms, etc.). For this demo we log and succeed.
    console.log("Contact form submission:", {
      name,
      email,
      message: message.slice(0, 200),
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Thanks for reaching out! We'll get back to you within 24 hours.",
    });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong on our end. Please try again." },
      { status: 500 }
    );
  }
}
