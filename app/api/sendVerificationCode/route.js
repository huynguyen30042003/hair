import nodemailer from "nodemailer";

export async function POST(req, res) {
  try {
    const { email } = await req.json();  // Sử dụng req.json() để lấy dữ liệu từ body của yêu cầu

    // Tạo một transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Tạo mã xác nhận ngẫu nhiên
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    // Tạo nội dung email
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "Mã Xác Nhận",
      text: `Mã xác nhận của bạn là: ${verificationCode}`,
    };

    // Gửi email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email đã được gửi thành công" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi gửi email" });
  }
}
