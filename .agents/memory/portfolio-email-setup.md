---
name: Portfolio contact form email
description: How the contact form email delivery is configured and why Gmail is used over Yahoo.
---

## Rule
Use Gmail SMTP (smtp.gmail.com:587) as the sender for the contact form. Do NOT use Yahoo SMTP.

**Why:** Yahoo SMTP (`smtp.mail.yahoo.com`) rejects DATA commands from cloud/datacenter IPs (Replit servers) with `550 Request failed; Mailbox unavailable`. Auth succeeds but message delivery fails. Gmail is permissive with app passwords from cloud apps.

**How to apply:** The API server reads `GMAIL_USER` and `GMAIL_APP_PASSWORD` secrets. Emails send FROM the Gmail address, deliver TO `mhonbastasa@yahoo.com.ph`, reply-to set to the form submitter. Both secrets are stored in Replit environment secrets.
