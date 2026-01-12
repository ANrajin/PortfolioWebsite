import type { Request, Response } from "express";
import { contactService } from "../services/contact.service.js";
import type { ContactFormInput } from "../validators/contact.validator.js";

export class ContactController {
    async submit(req: Request, res: Response): Promise<void> {
        const input: ContactFormInput = req.body;
        const result = await contactService.submitContactForm(input);
        res.status(201).json(result);
    }
}

export const contactController = new ContactController();
