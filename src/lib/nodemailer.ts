import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASSWORD || '',
    },
});

export async function sendContactEmail(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
}) {
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.ADMIN_EMAIL,
        subject: `[お問合せ] ${data.subject}`,
        text: `
名前: ${data.name}
メールアドレス: ${data.email}
件名: ${data.subject}

本文:
${data.message}
    `,
        html: `
      <h2>新しいお問合せがあります</h2>
      <p><strong>名前:</strong> ${data.name}</p>
      <p><strong>メールアドレス:</strong> ${data.email}</p>
      <p><strong>件名:</strong> ${data.subject}</p>
      <h3>本文:</h3>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
    `,
    };

    return await transporter.sendMail(mailOptions);
}
