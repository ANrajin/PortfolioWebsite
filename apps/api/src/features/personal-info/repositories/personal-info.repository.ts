import { prisma } from "@/lib/prisma.js";
import type { PersonalInfoEntity } from "../types/personal-info.types.js";

export interface UpdatePersonalInfoData {
    id?: string;
    name: string;
    title: string;
    email: string;
    phone: string;
    imageUrl?: string;
    careerObjective: string;
    socialLinks?: { platform: string; url: string; label: string }[];
}

export class PersonalInfoRepository {
    async findFirst(): Promise<PersonalInfoEntity | null> {
        return prisma.personalInfo.findFirst({ include: { socialLinks: true } });
    }

    async upsert(data: UpdatePersonalInfoData): Promise<PersonalInfoEntity> {
        const info = await prisma.personalInfo.upsert({
            where: { id: data.id || "default" },
            update: {
                name: data.name,
                title: data.title,
                email: data.email,
                phone: data.phone,
                imageUrl: data.imageUrl || null,
                careerObjective: data.careerObjective,
            },
            create: {
                name: data.name,
                title: data.title,
                email: data.email,
                phone: data.phone,
                imageUrl: data.imageUrl || null,
                careerObjective: data.careerObjective,
            },
        });

        if (data.socialLinks && Array.isArray(data.socialLinks)) {
            await prisma.socialLink.deleteMany({ where: { personalInfoId: info.id } });
            await prisma.socialLink.createMany({
                data: data.socialLinks.map(link => ({
                    platform: link.platform,
                    url: link.url,
                    label: link.label,
                    personalInfoId: info.id,
                })),
            });
        }

        return prisma.personalInfo.findUnique({
            where: { id: info.id },
            include: { socialLinks: true },
        }) as Promise<PersonalInfoEntity>;
    }
}

export const personalInfoRepository = new PersonalInfoRepository();
