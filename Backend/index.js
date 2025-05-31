const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'deepakofficial81@gmail.com',
        pass: 'ffda shsg zylt guic', // Gmail App Password
      },
    });

    // Get current date-time in a readable format
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
            <strong>Name:</strong> <span style="color: #0A2E3A;">${name}</span> <span style="font-size: 18px;">👤</span>
          </p>

          <p style="font-size: 16px; margin-bottom: 15px;">
            <strong>Email:</strong> <a href="mailto:${email}" style="color: #0A2E3A; text-decoration: none;">${email}</a> <span style="font-size: 18px;">✉️</span>
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
          ">
            ${message}
          </p>

          <p style="font-size: 14px; color: #555; margin-top: 30px;">
            🕒 Sent on: <strong>${formattedDate}</strong>
          </p>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />

          <footer style="font-size: 12px; color: #888; text-align: center;">
            This message was sent from your website contact form.
          </footer>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: email,
      to: 'deepakofficial81@gmail.com',
      subject: `New message from ${name}`,
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
