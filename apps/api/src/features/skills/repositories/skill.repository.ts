import { prisma } from "../../../lib/prisma.js";
import type { SkillEntity } from "../types/skill.types.js";

export interface CreateSkillData {
    name: string;
    category: string;
    proficiency?: number;
}

export interface UpdateSkillData extends CreateSkillData { }

export class SkillRepository {
    async findAll(): Promise<SkillEntity[]> {
        return prisma.skill.findMany({ orderBy: [{ category: "asc" }, { sortOrder: "asc" }] });
    }

    async findById(id: string): Promise<SkillEntity | null> {
        return prisma.skill.findUnique({ where: { id } });
    }

    async create(data: CreateSkillData): Promise<SkillEntity> {
        return prisma.skill.create({
            data: { name: data.name, category: data.category, proficiency: data.proficiency ?? 80 },
        });
    }

    async update(id: string, data: UpdateSkillData): Promise<SkillEntity> {
        return prisma.skill.update({
            where: { id },
            data: { name: data.name, category: data.category, proficiency: data.proficiency ?? 80 },
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.skill.delete({ where: { id } });
    }
}

export const skillRepository = new SkillRepository();
