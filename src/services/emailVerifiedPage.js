const getEmailVerifiedHtml = (loginUrl = 'http://localhost:5173/login') => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verified</title>
        <style>
            body {
                font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f3f4f6;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
            }
            .container {
                background: white;
                padding: 40px 30px;
                border-radius: 16px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
                text-align: center;
                max-width: 420px;
                width: 90%;
            }
            .icon-wrapper {
                width: 80px;
                height: 80px;
                background-color: #d1fae5;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0 auto 24px auto;
            }
            .icon {
                color: #10b981;
                font-size: 40px;
                font-weight: bold;
            }
            h1 {
                color: #111827;
                font-size: 24px;
                margin-bottom: 12px;
                margin-top: 0;
            }
            p {
                color: #4b5563;
                font-size: 16px;
                line-height: 1.6;
                margin-bottom: 32px;
            }
            .btn {
                display: inline-block;
                background-color: #10b981;
                color: white;
                text-decoration: none;
                padding: 14px 32px;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 600;
                transition: background-color 0.2s, transform 0.1s;
                width: 100%;
                box-sizing: border-box;
            }
            .btn:hover {
                background-color: #059669;
            }
            .btn:active {
                transform: scale(0.98);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="icon-wrapper">
                <div class="icon">✓</div>
            </div>
            <h1>Email Verified Successfully!</h1>
            <p>Your email has been verified and your account is now fully active. Thank you for joining us.</p>
            <a href="${loginUrl}" class="btn">Login to Your Account</a>
        </div>
    </body>
    </html>
  `;
};

module.exports = { getEmailVerifiedHtml };
