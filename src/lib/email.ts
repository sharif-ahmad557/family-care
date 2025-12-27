import nodemailer from "nodemailer";

export async function sendInvoiceEmail(
  toEmail: string,
  userName: string,
  serviceName: string,
  cost: number,
  bookingId: string
) {
  try {
    console.log("📨 Attempting to send email to:", toEmail); // লগে দেখব কাকে মেইল পাঠানো হচ্ছে

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS,
      },
    });

    // ইমেইল অপশন
    const mailOptions = {
      from: `"Family Care Admin" <${process.env.GMAIL_USER}>`,
      to: toEmail,
      subject: `Booking Confirmed - ${serviceName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
          <h2 style="color: #0EA5E9;">Booking Confirmation</h2>
          <p>Hello <strong>${userName}</strong>,</p>
          <p>Your booking for <strong>${serviceName}</strong> has been received.</p>
          <p><strong>Total Cost:</strong> ৳${cost}</p>
          <p><strong>Booking ID:</strong> ${bookingId}</p>
          <hr />
          <p>Thank you, <br> Family Care Team</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email Sent Successfully! MessageID:", info.messageId);
    return true;
  } catch (error) {
    console.error("❌ Email Sending Failed:", error);
    return false;
  }
}
