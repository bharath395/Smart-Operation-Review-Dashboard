const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendDeadlineAlert = async (issue) => {
  if (!process.env.EMAIL_PASS || process.env.EMAIL_PASS === 'your_app_password_here') {
    console.log(`⚠️ Email not configured. Would send alert for issue #${issue.id}`);
    return;
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `⚠️ Issue Deadline Exceeded - ${issue.line} ${issue.machine}`,
    html: `
      <h2>Issue Deadline Alert</h2>
      <p><strong>Issue has exceeded its deadline!</strong></p>
      <hr>
      <p><strong>Line:</strong> ${issue.line}</p>
      <p><strong>Machine:</strong> ${issue.machine}</p>
      <p><strong>Problem:</strong> ${issue.problem}</p>
      <p><strong>Status:</strong> ${issue.status}</p>
      <p><strong>Deadline:</strong> ${issue.deadline}</p>
      <p><strong>Reported By:</strong> ${issue.reportedBy}</p>
      <hr>
      <p style="color: red;">Please take immediate action!</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Alert email sent for issue #${issue.id} to ${process.env.ADMIN_EMAIL}`);
  } catch (error) {
    console.error(`❌ Error sending email for issue #${issue.id}:`, error.message);
  }
};

module.exports = { sendDeadlineAlert };
