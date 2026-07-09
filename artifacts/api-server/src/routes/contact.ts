import { Router, Request, Response } from "express";
import nodemailer from "nodemailer";
import rateLimit from "express-rate-limit";
import { logger } from "../lib/logger";

const router = Router();

// Allow max 5 contact submissions per IP per 15 minutes
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: "Too many requests. Please try again later." },
});

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

router.post("/contact", contactLimiter, async (req: Request, res: Response) => {
  const { name, email, message } = req.body as {
    name?: unknown;
    email?: unknown;
    message?: unknown;
  };

  // Type guards
  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
    res.status(400).json({ ok: false, error: "Invalid request payload." });
    return;
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();
  const cleanMessage = message.trim();

  // Length and format validation
  if (!cleanName || cleanName.length > 100) {
    res.status(400).json({ ok: false, error: "Name is required and must be under 100 characters." });
    return;
  }
  if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail) || cleanEmail.length > 254) {
    res.status(400).json({ ok: false, error: "A valid email address is required." });
    return;
  }
  if (!cleanMessage || cleanMessage.length < 10 || cleanMessage.length > 2000) {
    res.status(400).json({ ok: false, error: "Message must be between 10 and 2000 characters." });
    return;
  }

  const gmailUser = process.env["GMAIL_USER"];
  const gmailPass = process.env["GMAIL_APP_PASSWORD"];
  if (!gmailUser || !gmailPass) {
    logger.error("GMAIL_USER or GMAIL_APP_PASSWORD secret is not set");
    res.status(503).json({ ok: false, error: "Email service not configured." });
    return;
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  });

  const safeName = escapeHtml(cleanName);
  const safeEmail = escapeHtml(cleanEmail);
  const safeMessage = escapeHtml(cleanMessage);

  try {
    await transporter.sendMail({
      from: `"Portfolio | Raymond Bastasa" <${gmailUser}>`,
      to: "mhonbastasa@yahoo.com.ph",
      replyTo: `${cleanName} <${cleanEmail}>`,
      subject: `Portfolio inquiry from ${cleanName}`,
      text: `${cleanMessage}\n\n—\n${cleanName}\n${cleanEmail}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#21d4bd">New message from your portfolio</h2>
          <p style="color:#555"><strong>From:</strong> ${safeName} &lt;${safeEmail}&gt;</p>
          <hr style="border:1px solid #eee"/>
          <p style="color:#333;white-space:pre-line">${safeMessage}</p>
          <hr style="border:1px solid #eee"/>
          <p style="color:#aaa;font-size:12px">Sent via mhonbastasa.com portfolio contact form.</p>
        </div>
      `,
    });

    logger.info({ name: cleanName }, "Contact form email sent");
    res.json({ ok: true });
  } catch (err) {
    logger.error({ err }, "Failed to send contact form email");
    res.status(500).json({ ok: false, error: "Failed to send message. Please try again." });
  }
});

export default router;
