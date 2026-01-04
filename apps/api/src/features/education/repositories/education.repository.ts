import { prisma } from "../../../lib/prisma.js";
import type { EducationEntity } from "../types/education.types.js";

export interface CreateEducationData {
    institution: string;
    degree: string;
    field: string;
    startYear: number;
    endYear?: number | null;
    current?: boolean;
    description?: string;
}

export interface UpdateEducationData extends CreateEducationData { }

export class EducationRepository {
    async findAll(): Promise<EducationEntity[]> {
        return prisma.education.findMany({ orderBy: [{ current: "desc" }, { startYear: "desc" }] });
    }

    async findById(id: string): Promise<EducationEntity | null> {
        return prisma.education.findUnique({ where: { id } });
    }

    async create(data: CreateEducationData): Promise<EducationEntity> {
        return prisma.education.create({
            data: {
                institution: data.institution,
                degree: data.degree,
                field: data.field,
                startYear: data.startYear,
                endYear: data.endYear || null,
                current: data.current || false,
                description: data.description || null,
            },
        });
    }

    async update(id: string, data: UpdateEducationData): Promise<EducationEntity> {
        return prisma.education.update({
            where: { id },
            data: {
                institution: data.institution,
                degree: data.degree,
                field: data.field,
                startYear: data.startYear,
                endYear: data.endYear || null,
                current: data.current || false,
                description: data.description || null,
            },
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.education.delete({ where: { id } });
    }
}

export const educationRepository = new EducationRepository();
