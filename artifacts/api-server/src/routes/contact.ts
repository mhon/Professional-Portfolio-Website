import { Router } from "express";
import nodemailer from "nodemailer";
import { logger } from "../lib/logger";

const router = Router();

router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body as {
    name?: string;
    email?: string;
    message?: string;
  };

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    res.status(400).json({ ok: false, error: "All fields are required." });
    return;
  }

  const smtpPass = process.env["YAHOO_APP_PASSWORD"];
  if (!smtpPass) {
    logger.error("YAHOO_APP_PASSWORD secret is not set");
    res.status(503).json({ ok: false, error: "Email service not configured." });
    return;
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.mail.yahoo.com",
    port: 465,
    secure: true,
    auth: {
      user: "mhonbastasa@yahoo.com.ph",
      pass: smtpPass,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <mhonbastasa@yahoo.com.ph>`,
      to: "mhonbastasa@yahoo.com.ph",
      replyTo: `"${name}" <${email}>`,
      subject: `Portfolio inquiry from ${name}`,
      text: `${message}\n\n—\n${name}\n${email}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#21d4bd">New message from your portfolio</h2>
          <p style="color:#555"><strong>From:</strong> ${name} &lt;${email}&gt;</p>
          <hr style="border:1px solid #eee"/>
          <p style="color:#333;white-space:pre-line">${message}</p>
          <hr style="border:1px solid #eee"/>
          <p style="color:#aaa;font-size:12px">Sent via mhonbastasa.com portfolio contact form.</p>
        </div>
      `,
    });

    logger.info({ from: email, name }, "Contact form email sent");
    res.json({ ok: true });
  } catch (err) {
    logger.error({ err }, "Failed to send contact form email");
    res.status(500).json({ ok: false, error: "Failed to send message. Please try again." });
  }
});

export default router;
