const getVerificationEmailHtml = (firstName, verificationLink) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email</title>
      <style>
        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          background-color: #f4f7f6;
          margin: 0;
          padding: 0;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          margin-top: 40px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }
        .header {
          background-color: #10b981;
          padding: 30px 20px;
          text-align: center;
          color: #ffffff;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
        }
        .content {
          padding: 30px 40px;
          color: #333333;
          line-height: 1.6;
        }
        .content h2 {
          color: #333333;
          font-size: 20px;
          margin-top: 0;
        }
        .btn-container {
          text-align: center;
          margin: 30px 0;
        }
        .btn {
          display: inline-block;
          background-color: #10b981;
          color: #ffffff !important;
          text-decoration: none;
          padding: 14px 30px;
          border-radius: 5px;
          font-size: 16px;
          font-weight: bold;
        }
        .footer {
          background-color: #f9f9f9;
          padding: 20px;
          text-align: center;
          color: #888888;
          font-size: 12px;
          border-top: 1px solid #eeeeee;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>Welcome to Our Platform 🎉</h1>
        </div>
        <div class="content">
          <h2>Hi ${firstName},</h2>
          <p>Your account has been successfully created. We're excited to have you on board!</p>
          <p>To get started and fully activate your account, please verify your email address by clicking the button below:</p>
          
          <div class="btn-container">
            <a href="${verificationLink}" class="btn">Verify Email Address</a>
          </div>
          
          <p>If the button doesn't work, you can also copy and paste the following link into your browser:</p>
          <p style="word-break: break-all; color: #10b981; font-size: 14px;">${verificationLink}</p>
          
          <p>Thank you for registering with us.</p>
          <p>Regards,<br><strong>The Team</strong></p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Our Platform. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = { getVerificationEmailHtml };
