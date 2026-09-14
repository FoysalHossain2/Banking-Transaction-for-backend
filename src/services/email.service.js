require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Backend Ledger" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

  } catch (error) {
    console.error('Error sending email:', error);
  }
};

async function sendRegistrationEmail(userEmail, name) {
  const subject = "Welcome to Backend Ledger!";

  const text = `Hello ${name},

Thank you for registering at Backend Ledger.
We're excited to have you on board!

Best regards,
The Backend Ledger Team`;

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Backend Ledger</title>
  </head>
  <body style="margin:0; padding:0; background-color:#eef7ee; font-family: Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eef7ee; padding:30px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.06);">
            
            <!-- Header -->
            <tr>
              <td style="background-color:#4CAF50; padding:30px 40px; text-align:center;">
                <h1 style="margin:0; color:#ffffff; font-size:26px; font-weight:600;">
                  Backend Ledger
                </h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:40px;">
                <h2 style="margin-top:0; color:#2e7d32; font-size:22px;">
                  Welcome aboard, ${name}! 🎉
                </h2>
                <p style="color:#333333; font-size:16px; line-height:1.6; margin:16px 0;">
                  Thank you for registering at <strong>Backend Ledger</strong>. We're thrilled to have you join our community and can't wait to help you get started.
                </p>
                <p style="color:#333333; font-size:16px; line-height:1.6; margin:16px 0;">
                  Your account is all set up and ready to go. If you have any questions along the way, our team is always here to help.
                </p>

                <!-- Button -->
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin:30px auto;">
                  <tr>
                    <td style="background-color:#4CAF50; border-radius:6px;">
                      <a href="#" style="display:inline-block; padding:14px 32px; color:#ffffff; text-decoration:none; font-size:16px; font-weight:600;">
                        Get Started
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="color:#333333; font-size:16px; line-height:1.6; margin:16px 0 0;">
                  Best regards,<br />
                  <strong>The Backend Ledger Team</strong>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color:#f1f8f2; padding:20px 40px; text-align:center;">
                <p style="margin:0; color:#7a9b7f; font-size:12px;">
                  © ${new Date().getFullYear()} Backend Ledger. All rights reserved.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;

  await sendEmail(userEmail, subject, text, html);
}

module.exports = { sendRegistrationEmail };