import cron from "node-cron";
import { messageQueueRepository } from "../../contact/repositories/message-queue.repository.js";
import { emailSenderService } from "../services/email-sender.service.js";

const MAX_ATTEMPTS = 3;

async function processMessageQueue(): Promise<void> {
    try {
        const pendingMessages = await messageQueueRepository.findPending(10);

        if (pendingMessages.length === 0) {
            return;
        }

        console.log(`📧 Processing ${pendingMessages.length} pending message(s)...`);

        for (const message of pendingMessages) {
            try {
                await emailSenderService.sendContactEmail({
                    senderName: message.senderName,
                    senderEmail: message.senderEmail,
                    subject: message.subject,
                    message: message.message,
                });

                await messageQueueRepository.markAsSent(message.id);
                console.log(`✅ Email sent successfully for message ID: ${message.id}`);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Unknown error";
                console.error(`❌ Failed to send email for message ID: ${message.id}`, errorMessage);

                if (message.attempts + 1 >= MAX_ATTEMPTS) {
                    await messageQueueRepository.markAsFailed(message.id, errorMessage);
                    console.log(`⚠️ Message ID: ${message.id} marked as failed after ${MAX_ATTEMPTS} attempts`);
                } else {
                    await messageQueueRepository.incrementAttempts(message.id);
                }
            }
        }
    } catch (error) {
        console.error("❌ Error processing message queue:", error);
    }
}

export function startMessageProcessor(): void {
    console.log("🚀 Starting message queue processor (runs every minute)...");

    cron.schedule("* * * * *", () => {
        processMessageQueue();
    });

    processMessageQueue();
}

export { processMessageQueue };
