import { educationRepository } from "../repositories/education.repository.js";
import { AppError } from "@/shared/errors/app-error.js";
import type { EducationDto, EducationEntity } from "../types/education.types.js";
import type { CreateEducationInput, UpdateEducationInput } from "../validators/education.validator.js";

function mapToDto(entity: EducationEntity): EducationDto {
    return {
        id: entity.id,
        institution: entity.institution,
        degree: entity.degree,
        field: entity.field,
        startYear: entity.startYear,
        endYear: entity.endYear,
        current: entity.current,
        ...(entity.description && { description: entity.description }),
    };
}

export class EducationService {
    async getAllEducation(): Promise<EducationDto[]> {
        const educations = await educationRepository.findAll();
        return educations.map(mapToDto);
    }

    async getEducationById(id: string): Promise<EducationDto> {
        const education = await educationRepository.findById(id);
        if (!education) throw AppError.notFound("Education");
        return mapToDto(education);
    }

    async createEducation(input: CreateEducationInput): Promise<EducationDto> {
        const education = await educationRepository.create(input);
        return mapToDto(education);
    }

    async updateEducation(id: string, input: UpdateEducationInput): Promise<EducationDto> {
        const existing = await educationRepository.findById(id);
        if (!existing) throw AppError.notFound("Education");
        const education = await educationRepository.update(id, input);
        return mapToDto(education);
    }

    async deleteEducation(id: string): Promise<void> {
        const existing = await educationRepository.findById(id);
        if (!existing) throw AppError.notFound("Education");
        await educationRepository.delete(id);
    }
}

export const educationService = new EducationService();
