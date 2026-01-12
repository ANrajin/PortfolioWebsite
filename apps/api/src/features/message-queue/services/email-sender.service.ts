import nodemailer from "nodemailer";
import { getSmtpConfig } from "../config/smtp.config.js";
import {
    generateContactEmailHtml,
    generateContactEmailSubject,
    type ContactEmailData
} from "../templates/contact-email.template.js";

export class EmailSenderService {
    private transporter: nodemailer.Transporter | null = null;

    private getTransporter(): nodemailer.Transporter {
        if (!this.transporter) {
            const config = getSmtpConfig();
            this.transporter = nodemailer.createTransport({
                host: config.host,
                port: config.port,
                secure: config.secure,
                auth: {
                    user: config.user,
                    pass: config.password,
                },
            });
        }
        return this.transporter;
    }

    async sendContactEmail(data: ContactEmailData): Promise<void> {
        const config = getSmtpConfig();
        const transporter = this.getTransporter();

        const mailOptions = {
            from: `"${config.senderName}" <${config.senderEmail}>`,
            to: config.recipientEmail,
            replyTo: data.senderEmail,
            subject: generateContactEmailSubject(data.subject),
            html: generateContactEmailHtml(data),
        };

        await transporter.sendMail(mailOptions);
    }

    async verifyConnection(): Promise<boolean> {
        try {
            const transporter = this.getTransporter();
            await transporter.verify();
            return true;
        } catch {
            return false;
        }
    }
}

export const emailSenderService = new EmailSenderService();
