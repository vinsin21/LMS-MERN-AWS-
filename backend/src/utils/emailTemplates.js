export const emailVerificationTemplate = (otp) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
            body {
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                -webkit-font-smoothing: antialiased;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 40px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
                margin-top: 40px;
                margin-bottom: 40px;
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
            }
            .header h1 {
                color: #333333;
                font-size: 24px;
                margin: 0;
            }
            .content {
                color: #555555;
                font-size: 16px;
                line-height: 1.6;
                text-align: center;
            }
            .otp-box {
                background-color: #f0f7ff;
                border: 1px solid #cce5ff;
                border-radius: 6px;
                padding: 15px;
                font-size: 28px;
                font-weight: bold;
                color: #007bff;
                letter-spacing: 4px;
                margin: 30px 0;
                display: inline-block;
            }
            .footer {
                margin-top: 40px;
                text-align: center;
                font-size: 12px;
                color: #999999;
                border-top: 1px solid #eeeeee;
                padding-top: 20px;
            }
            .warning {
                font-size: 14px;
                color: #888888;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Verify Your Email</h1>
            </div>
            <div class="content">
                <p>Hello,</p>
                <p>Thank you for registering with us. To complete your sign-up process, please use the One-Time Password (OTP) below to verify your email address.</p>
                
                <div class="otp-box">
                    ${otp}
                </div>
                
                <p class="warning">This OTP is valid for 10 minutes. If you did not request this verification, please ignore this email.</p>
            </div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} CoderGyan. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

export const passwordResetTemplate = (resetToken, email) => {
    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <!-- Header -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Password Reset Request</h1>
                            </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                            <td style="padding: 40px 30px;">
                                <p style="color: #333333; font-size: 16px; line-height: 24px; margin: 0 0 20px;">
                                    Hello,
                                </p>
                                
                                <p style="color: #333333; font-size: 16px; line-height: 24px; margin: 0 0 20px;">
                                    We received a request to reset the password for your account associated with <strong>${email}</strong>.
                                </p>
                                
                                <p style="color: #333333; font-size: 16px; line-height: 24px; margin: 0 0 30px;">
                                    Click the button below to reset your password. This link will expire in <strong>1 hour</strong>.
                                </p>
                                
                                <!-- Reset Button -->
                                <table width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td align="center" style="padding: 20px 0;">
                                            <a href="${resetLink}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; padding: 14px 40px; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: bold; display: inline-block;">
                                                Reset Password
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                                
                                <p style="color: #666666; font-size: 14px; line-height: 20px; margin: 30px 0 0;">
                                    Or copy and paste this link in your browser:
                                </p>
                                <p style="color: #667eea; font-size: 12px; word-break: break-all; margin: 10px 0 20px;">
                                    ${resetLink}
                                </p>
                                
                                <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0;">
                                
                                <p style="color: #999999; font-size: 14px; line-height: 20px; margin: 0;">
                                    If you didn't request a password reset, please ignore this email or contact support if you have concerns.
                                </p>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style="background-color: #f8f9fa; padding: 20px 30px; text-align: center;">
                                <p style="color: #999999; font-size: 12px; margin: 0;">
                                    © ${new Date().getFullYear()} CoderGyan. All rights reserved.
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
};

export const passwordChangedTemplate = (email, timestamp, ipAddress, userAgent) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Changed Successfully</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <!-- Header -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); padding: 40px 30px; text-align: center;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 28px;">✓ Password Changed</h1>
                            </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                            <td style="padding: 40px 30px;">
                                <p style="color: #333333; font-size: 16px; line-height: 24px; margin: 0 0 20px;">
                                    Hello,
                                </p>
                                
                                <p style="color: #333333; font-size: 16px; line-height: 24px; margin: 0 0 30px;">
                                    Your password for <strong>${email}</strong> was successfully changed.
                                </p>
                                
                                <div style="background-color: #f8f9fa; border-left: 4px solid #11998e; padding: 15px 20px; margin: 0 0 30px;">
                                    <p style="color: #666666; font-size: 14px; margin: 0 0 10px;"><strong>Change Details:</strong></p>
                                    <p style="color: #666666; font-size: 13px; margin: 0 0 5px;">Time: ${timestamp}</p>
                                    <p style="color: #666666; font-size: 13px; margin: 0 0 5px;">IP Address: ${ipAddress || 'Unknown'}</p>
                                    <p style="color: #666666; font-size: 13px; margin: 0;">Device: ${userAgent || 'Unknown'}</p>
                                </div>
                                
                                <p style="color: #333333; font-size: 16px; line-height: 24px; margin: 0 0 20px;">
                                    All active sessions have been logged out for security. Please log in again with your new password.
                                </p>
                                
                                <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0;">
                                
                                <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px 20px;">
                                    <p style="color: #856404; font-size: 14px; margin: 0; line-height: 20px;">
                                        <strong>⚠️ Didn't make this change?</strong><br>
                                        If you didn't reset your password, your account may be compromised. Please contact our support team immediately.
                                    </p>
                                </div>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style="background-color: #f8f9fa; padding: 20px 30px; text-align: center;">
                                <p style="color: #999999; font-size: 12px; margin: 0;">
                                    © ${new Date().getFullYear()} CoderGyan. All rights reserved.
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
};
