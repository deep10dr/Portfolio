require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

// Security: Limit JSON request payload to 50KB to mitigate large payload attacks
app.use(cors());
app.use(express.json({ limit: '50kb' }));

// Utility: HTML entity escaping to prevent HTML/XSS injection in email clients
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  // Validation 1: Required fields check
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Validation 2: Email format check
  const trimmedEmail = String(email).trim();
  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return res.status(400).json({ message: 'Please provide a valid email address.' });
  }

  // Validation 3: Length boundaries
  const trimmedName = String(name).trim();
  const trimmedMessage = String(message).trim();

  if (trimmedName.length > 100) {
    return res.status(400).json({ message: 'Name must be under 100 characters.' });
  }

  if (trimmedMessage.length > 5000) {
    return res.status(400).json({ message: 'Message must be under 5000 characters.' });
  }

  // Sanitize user inputs for safe HTML rendering in email clients
  const safeName = escapeHtml(trimmedName);
  const safeEmail = escapeHtml(trimmedEmail);
  const safeMessage = escapeHtml(trimmedMessage);

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password
      },
    });

    // Format current date-time in Indian Standard Time (IST)
    const now = new Date();
    const formattedDate = now.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const htmlContent = `
      <div style="
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f7f9fc;
        padding: 30px;
        color: #1a1a1a;
      ">
        <div style="
          max-width: 600px;
          margin: auto;
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          padding: 25px 40px;
        ">
          <h1 style="color: #0D4C5C; margin-bottom: 20px; border-bottom: 3px solid #0A2E3A; padding-bottom: 10px;">
            📬 You have a new message!
          </h1>

          <p style="font-size: 16px; margin-bottom: 15px;">
            <strong>Name:</strong> <span style="color: #0A2E3A;">${safeName}</span> <span style="font-size: 18px;">👤</span>
          </p>

          <p style="font-size: 16px; margin-bottom: 15px;">
            <strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: #0A2E3A; text-decoration: none;">${safeEmail}</a> <span style="font-size: 18px;">✉️</span>
          </p>

          <p style="font-size: 16px; margin-bottom: 25px;">
            <strong>Message:</strong>
          </p>

          <p style="
            background-color: #e8f0fe;
            border-left: 6px solid #0D4C5C;
            padding: 15px 20px;
            border-radius: 6px;
            font-style: italic;
            font-size: 15px;
            color: #333;
            line-height: 1.5;
            white-space: pre-wrap;
          ">
            ${safeMessage}
          </p>

          <p style="font-size: 14px; color: #555; margin-top: 30px;">
            🕒 Sent on: <strong>${formattedDate}</strong>
          </p>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />

          <footer style="font-size: 12px; color: #888; text-align: center;">
            This message was sent securely from your website contact form.
          </footer>
        </div>
      </div>
    `;

    // Send email with SPF/DKIM compliant From header and direct Reply-To
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      replyTo: trimmedEmail,
      to: process.env.EMAIL_USER,
      subject: `New message from ${safeName}`,
      text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\nDate: ${formattedDate}\n\nMessage:\n${trimmedMessage}`,
      html: htmlContent,
    });

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ message: 'Server error. Try again later.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

