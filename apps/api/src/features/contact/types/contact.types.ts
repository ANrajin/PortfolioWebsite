export interface ContactFormInput {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface ContactFormResponse {
    success: boolean;
    message: string;
}
