import { experienceRepository } from "../repositories/experience.repository.js";
import { AppError } from "../../../shared/errors/app-error.js";
import type { ExperienceDto, ExperienceEntity } from "../types/experience.types.js";
import type { CreateExperienceInput, UpdateExperienceInput } from "../validators/experience.validator.js";

function mapToDto(entity: ExperienceEntity): ExperienceDto {
    return {
        id: entity.id,
        company: entity.company,
        position: entity.position,
        startDate: entity.startDate.toISOString().split("T")[0],
        endDate: entity.endDate?.toISOString().split("T")[0] || null,
        current: entity.current,
        description: entity.description,
        technologies: entity.technologies,
    };
}

export class ExperienceService {
    async getAllExperiences(): Promise<ExperienceDto[]> {
        const experiences = await experienceRepository.findAll();
        return experiences.map(mapToDto);
    }

    async getExperienceById(id: string): Promise<ExperienceDto> {
        const experience = await experienceRepository.findById(id);
        if (!experience) throw AppError.notFound("Experience");
        return mapToDto(experience);
    }

    async createExperience(input: CreateExperienceInput): Promise<ExperienceDto> {
        const experience = await experienceRepository.create({
            company: input.company,
            position: input.position,
            startDate: new Date(input.startDate),
            endDate: input.endDate ? new Date(input.endDate) : null,
            current: input.current,
            description: input.description,
            technologies: input.technologies,
        });
        return mapToDto(experience);
    }

    async updateExperience(id: string, input: UpdateExperienceInput): Promise<ExperienceDto> {
        const existing = await experienceRepository.findById(id);
        if (!existing) throw AppError.notFound("Experience");
        const experience = await experienceRepository.update(id, {
            company: input.company,
            position: input.position,
            startDate: new Date(input.startDate),
            endDate: input.endDate ? new Date(input.endDate) : null,
            current: input.current,
            description: input.description,
            technologies: input.technologies,
        });
        return mapToDto(experience);
    }

    async deleteExperience(id: string): Promise<void> {
        const existing = await experienceRepository.findById(id);
        if (!existing) throw AppError.notFound("Experience");
        await experienceRepository.delete(id);
    }
}

export const experienceService = new ExperienceService();
