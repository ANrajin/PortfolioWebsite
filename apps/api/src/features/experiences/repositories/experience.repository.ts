import { prisma } from "@/lib/prisma.js";
import type { ExperienceEntity } from "../types/experience.types.js";

export interface CreateExperienceData {
    company: string;
    position: string;
    startDate: Date;
    endDate?: Date | null;
    current?: boolean;
    description: string;
    technologies?: string[];
}

export type UpdateExperienceData = CreateExperienceData;

function parseTechnologies(techs: unknown): string[] {
    if (Array.isArray(techs)) return techs as string[];
    if (typeof techs === "string") {
        try { return JSON.parse(techs); } catch { return []; }
    }
    return [];
}

export class ExperienceRepository {
    async findAll(): Promise<ExperienceEntity[]> {
        const experiences = await prisma.experience.findMany({
            orderBy: [{ current: "desc" }, { startDate: "desc" }],
        });
        return experiences.map(exp => ({ ...exp, technologies: parseTechnologies(exp.technologies) }));
    }

    async findById(id: string): Promise<ExperienceEntity | null> {
        const exp = await prisma.experience.findUnique({ where: { id } });
        if (!exp) return null;
        return { ...exp, technologies: parseTechnologies(exp.technologies) };
    }

    async create(data: CreateExperienceData): Promise<ExperienceEntity> {
        const exp = await prisma.experience.create({
            data: {
                company: data.company,
                position: data.position,
                startDate: data.startDate,
                endDate: data.endDate || null,
                current: data.current || false,
                description: data.description,
                technologies: data.technologies || [],
            },
        });
        return { ...exp, technologies: parseTechnologies(exp.technologies) };
    }

    async update(id: string, data: UpdateExperienceData): Promise<ExperienceEntity> {
        const exp = await prisma.experience.update({
            where: { id },
            data: {
                company: data.company,
                position: data.position,
                startDate: data.startDate,
                endDate: data.endDate || null,
                current: data.current || false,
                description: data.description,
                technologies: data.technologies || [],
            },
        });
        return { ...exp, technologies: parseTechnologies(exp.technologies) };
    }

    async delete(id: string): Promise<void> {
        await prisma.experience.delete({ where: { id } });
    }
}

export const experienceRepository = new ExperienceRepository();
