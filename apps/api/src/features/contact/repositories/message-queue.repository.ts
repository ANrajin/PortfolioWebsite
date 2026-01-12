import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface CreateMessageQueueInput {
    senderName: string;
    senderEmail: string;
    subject: string;
    message: string;
}

export class MessageQueueRepository {
    async create(input: CreateMessageQueueInput) {
        return prisma.messageQueue.create({
            data: {
                senderName: input.senderName,
                senderEmail: input.senderEmail,
                subject: input.subject,
                message: input.message,
                status: "pending",
                attempts: 0,
            },
        });
    }

    async findPending(limit: number = 10) {
        return prisma.messageQueue.findMany({
            where: {
                status: "pending",
                attempts: { lt: 3 },
            },
            take: limit,
            orderBy: { createdAt: "asc" },
        });
    }

    async markAsSent(id: string) {
        return prisma.messageQueue.update({
            where: { id },
            data: {
                status: "sent",
                sentAt: new Date(),
            },
        });
    }

    async markAsFailed(id: string, error: string) {
        return prisma.messageQueue.update({
            where: { id },
            data: {
                status: "failed",
                error,
                attempts: { increment: 1 },
            },
        });
    }

    async incrementAttempts(id: string) {
        return prisma.messageQueue.update({
            where: { id },
            data: {
                attempts: { increment: 1 },
            },
        });
    }
}

export const messageQueueRepository = new MessageQueueRepository();
