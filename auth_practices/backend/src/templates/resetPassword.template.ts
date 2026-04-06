export const resetPasswordTemplate = (username: string, resetUrl: string) => {
  return `
  <!DOCTYPE html>
  <html>
  <body style="margin:0; padding:0; background:#f4f6f8; font-family:Arial, sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;">
      <tr>
        <td align="center">

          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td style="background:#2563eb; padding:20px; text-align:center; color:#ffffff;">
                <h1 style="margin:0;">Anos Solutions</h1>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding:30px; color:#333;">
                <h2 style="margin-top:0;">Hi ${username},</h2>

                <p>We received a request to reset your password.</p>

                <p>Click the button below to set a new password:</p>

                <!-- Button -->
                <table cellpadding="0" cellspacing="0" style="margin:20px 0;">
                  <tr>
                    <td align="center">
                      <a href="${resetUrl}" 
                         style="background:#dc2626; color:#ffffff; padding:12px 20px; text-decoration:none; border-radius:5px; display:inline-block;">
                         Reset Password
                      </a>
                    </td>
                  </tr>
                </table>

                <p>If the button doesn’t work, copy and paste this link:</p>
                <p style="word-break:break-all;">
                  <a href="${resetUrl}">${resetUrl}</a>
                </p>

                <p>This link will expire in 10 minutes.</p>

                <p>If you did not request a password reset, you can safely ignore this email.</p>

                <p>Thanks,<br><strong>Team Anos Solutions</strong></p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f1f5f9; padding:20px; text-align:center; font-size:12px; color:#666;">
                <p style="margin:0;">© 2026 Anos Solutions</p>
                <p style="margin:5px 0;">Your account security is important to us.</p>
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