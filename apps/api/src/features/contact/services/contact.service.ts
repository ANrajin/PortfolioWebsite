import { messageQueueRepository } from "../repositories/message-queue.repository.js";
import type { ContactFormInput } from "../validators/contact.validator.js";
import type { ContactFormResponse } from "../types/contact.types.js";

export class ContactService {
    async submitContactForm(input: ContactFormInput): Promise<ContactFormResponse> {
        await messageQueueRepository.create({
            senderName: input.name,
            senderEmail: input.email,
            subject: input.subject,
            message: input.message,
        });

        return {
            success: true,
            message: "Thank you! Your message has been received. I'll get back to you soon.",
        };
    }
}

export const contactService = new ContactService();
