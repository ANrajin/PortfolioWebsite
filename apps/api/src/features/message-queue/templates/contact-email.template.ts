export interface ContactEmailData {
    senderName: string;
    senderEmail: string;
    subject: string;
    message: string;
}

export function generateContactEmailHtml(data: ContactEmailData): string {
    const escapedMessage = data.message
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br>");

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1e293b;
      margin: 0;
      padding: 0;
      background-color: #f1f5f9;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #0d9488, #14b8a6);
      padding: 24px 30px;
      color: #ffffff;
    }
    .header h2 {
      margin: 0;
      font-size: 22px;
      font-weight: 600;
    }
    .header p {
      margin: 8px 0 0;
      opacity: 0.9;
      font-size: 14px;
    }
    .content {
      padding: 30px;
    }
    .field {
      margin-bottom: 20px;
      padding: 16px;
      background: #f8fafc;
      border-radius: 8px;
      border-left: 4px solid #14b8a6;
    }
    .label {
      font-weight: 600;
      color: #0f766e;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
    }
    .value {
      color: #334155;
      font-size: 15px;
    }
    .message-field {
      background: #ffffff;
      border: 1px solid #e2e8f0;
    }
    .message-content {
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .footer {
      text-align: center;
      padding: 20px 30px;
      background: #f8fafc;
      color: #64748b;
      font-size: 12px;
      border-top: 1px solid #e2e8f0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>📬 New Contact Form Submission</h2>
      <p>Someone reached out via your portfolio website</p>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">From</div>
        <div class="value">${data.senderName}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${data.senderEmail}" style="color: #0d9488; text-decoration: none;">${data.senderEmail}</a></div>
      </div>
      <div class="field">
        <div class="label">Subject</div>
        <div class="value">${data.subject}</div>
      </div>
      <div class="field message-field">
        <div class="label">Message</div>
        <div class="value message-content">${escapedMessage}</div>
      </div>
    </div>
    <div class="footer">
      Sent via Portfolio Contact Form • ${new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    })}
    </div>
  </div>
</body>
</html>
  `.trim();
}

export function generateContactEmailSubject(subject: string): string {
    return `📬 New Contact: ${subject}`;
}
