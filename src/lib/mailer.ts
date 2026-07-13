import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | undefined;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: Number(process.env.SMTP_PORT ?? 465) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
}

export async function sendMail(options: {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}) {
  return getTransporter().sendMail({
    from: `RavenClaw <${process.env.SMTP_USER}>`,
    ...options,
  });
}
