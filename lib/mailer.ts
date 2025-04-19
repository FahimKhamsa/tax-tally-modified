import nodemailer from 'nodemailer';
import { formatDate } from './utils';

if (!process.env.EMAIL_SERVER || !process.env.EMAIL_FROM) {
  throw new Error('Email configuration is missing');
}

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendPdfEmail(
  email: string,
  pdfUrl: string,
  expiresAt: Date
) {
  try {
    const formattedDate = formatDate(expiresAt);
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Your Tax Form PDF from TaxTally',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #4ade80; padding: 20px; text-align: center; color: white;">
            <h1 style="margin: 0;">TaxTally</h1>
          </div>
          <div style="padding: 20px; border: 1px solid #eaeaea; border-top: none;">
            <p>Hello,</p>
            <p>Thank you for using TaxTally! Your tax form PDF is ready.</p>
            <p>You can access your PDF using the link below:</p>
            <p style="text-align: center;">
              <a href="${pdfUrl}" style="background-color: #4ade80; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Download Your PDF</a>
            </p>
            <p><strong>Important:</strong> This link will expire on ${formattedDate}.</p>
            <p>If you have any questions, please contact our support team.</p>
            <p>Best regards,</p>
            <p>The TaxTally Team</p>
          </div>
          <div style="background-color: #f3f4f6; padding: 10px; text-align: center; font-size: 12px; color: #6b7280;">
            <p>&copy; ${new Date().getFullYear()} TaxTally. All rights reserved.</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: 'tax-form.pdf',
          path: pdfUrl,
        },
      ],
    };
    
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}