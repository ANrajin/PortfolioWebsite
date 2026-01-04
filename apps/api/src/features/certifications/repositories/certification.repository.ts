import { prisma } from "../../../lib/prisma.js";
import type { CertificationEntity } from "../types/certification.types.js";

export interface CreateCertificationData {
    name: string;
    organization: string;
    issueDate: Date;
    expirationDate?: Date | null;
    credentialId?: string;
    credentialUrl?: string;
    skills?: string[];
    mediaUrl?: string;
    mediaType?: string;
}

export interface UpdateCertificationData extends CreateCertificationData { }

function parseSkills(skills: unknown): string[] {
    if (Array.isArray(skills)) return skills as string[];
    if (typeof skills === "string") {
        try { return JSON.parse(skills); } catch { return []; }
    }
    return [];
}

export class CertificationRepository {
    async findAll(): Promise<CertificationEntity[]> {
        const certifications = await prisma.certification.findMany({
            orderBy: { issueDate: "desc" },
        });
        return certifications.map(cert => ({
            ...cert,
            skills: parseSkills(cert.skills),
        }));
    }

    async findById(id: string): Promise<CertificationEntity | null> {
        const cert = await prisma.certification.findUnique({ where: { id } });
        if (!cert) return null;
        return { ...cert, skills: parseSkills(cert.skills) };
    }

    async create(data: CreateCertificationData): Promise<CertificationEntity> {
        const cert = await prisma.certification.create({
            data: {
                name: data.name,
                organization: data.organization,
                issueDate: data.issueDate,
                expirationDate: data.expirationDate || null,
                credentialId: data.credentialId || null,
                credentialUrl: data.credentialUrl || null,
                skills: data.skills || [],
                mediaUrl: data.mediaUrl || null,
                mediaType: data.mediaType || null,
            },
        });
        return { ...cert, skills: parseSkills(cert.skills) };
    }

    async update(id: string, data: UpdateCertificationData): Promise<CertificationEntity> {
        const cert = await prisma.certification.update({
            where: { id },
            data: {
                name: data.name,
                organization: data.organization,
                issueDate: data.issueDate,
                expirationDate: data.expirationDate || null,
                credentialId: data.credentialId || null,
                credentialUrl: data.credentialUrl || null,
                skills: data.skills || [],
                mediaUrl: data.mediaUrl || null,
                mediaType: data.mediaType || null,
            },
        });
        return { ...cert, skills: parseSkills(cert.skills) };
    }

    async delete(id: string): Promise<void> {
        await prisma.certification.delete({ where: { id } });
    }
}

export const certificationRepository = new CertificationRepository();
