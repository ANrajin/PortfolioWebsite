import { skillRepository } from "../repositories/skill.repository.js";
import { AppError } from "@/shared/errors/app-error.js";
import type { SkillDto, SkillEntity } from "../types/skill.types.js";
import type { CreateSkillInput, UpdateSkillInput } from "../validators/skill.validator.js";

function mapToDto(entity: SkillEntity): SkillDto {
    return { id: entity.id, name: entity.name, category: entity.category, proficiency: entity.proficiency };
}

export class SkillService {
    async getAllSkills(): Promise<SkillDto[]> {
        const skills = await skillRepository.findAll();
        return skills.map(mapToDto);
    }

    async getSkillById(id: string): Promise<SkillDto> {
        const skill = await skillRepository.findById(id);
        if (!skill) throw AppError.notFound("Skill");
        return mapToDto(skill);
    }

    async createSkill(input: CreateSkillInput): Promise<SkillDto> {
        const skill = await skillRepository.create(input);
        return mapToDto(skill);
    }

    async updateSkill(id: string, input: UpdateSkillInput): Promise<SkillDto> {
        const existing = await skillRepository.findById(id);
        if (!existing) throw AppError.notFound("Skill");
        const skill = await skillRepository.update(id, input);
        return mapToDto(skill);
    }

    async deleteSkill(id: string): Promise<void> {
        const existing = await skillRepository.findById(id);
        if (!existing) throw AppError.notFound("Skill");
        await skillRepository.delete(id);
    }
}

export const skillService = new SkillService();
