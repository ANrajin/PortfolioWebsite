export interface SmtpConfig {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    password: string;
    senderName: string;
    senderEmail: string;
    recipientEmail: string;
}

export function getSmtpConfig(): SmtpConfig {
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || "587", 10);
    const secure = process.env.SMTP_SECURE === "true";
    const user = process.env.SMTP_USER;
    const password = process.env.SMTP_PASSWORD;
    const senderName = process.env.SMTP_SENDER_NAME || "Portfolio Contact";
    const senderEmail = process.env.SMTP_SENDER_EMAIL;
    const recipientEmail = process.env.SMTP_RECIPIENT_EMAIL;

    if (!host || !user || !password || !senderEmail || !recipientEmail) {
        throw new Error(
            "Missing SMTP configuration. Please check your .env file for: " +
            "SMTP_HOST, SMTP_USER, SMTP_PASSWORD, SMTP_SENDER_EMAIL, SMTP_RECIPIENT_EMAIL"
        );
    }

    return {
        host,
        port,
        secure,
        user,
        password,
        senderName,
        senderEmail,
        recipientEmail,
    };
}
