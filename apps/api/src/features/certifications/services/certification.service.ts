import { certificationRepository } from "../repositories/certification.repository.js";
import { AppError } from "@/shared/errors/app-error.js";
import type { CertificationDto, CertificationEntity } from "../types/certification.types.js";
import type { CreateCertificationInput, UpdateCertificationInput } from "../validators/certification.validator.js";

function mapToDto(entity: CertificationEntity): CertificationDto {
    return {
        id: entity.id,
        name: entity.name,
        organization: entity.organization,
        issueDate: entity.issueDate.toISOString().split("T")[0],
        expirationDate: entity.expirationDate?.toISOString().split("T")[0] || null,
        ...(entity.credentialId && { credentialId: entity.credentialId }),
        ...(entity.credentialUrl && { credentialUrl: entity.credentialUrl }),
        skills: entity.skills,
        ...(entity.mediaUrl && { mediaUrl: entity.mediaUrl }),
        ...(entity.mediaType && { mediaType: entity.mediaType }),
    };
}

export class CertificationService {
    async getAllCertifications(): Promise<CertificationDto[]> {
        const certifications = await certificationRepository.findAll();
        return certifications.map(mapToDto);
    }

    async getCertificationById(id: string): Promise<CertificationDto> {
        const certification = await certificationRepository.findById(id);
        if (!certification) {
            throw AppError.notFound("Certification");
        }
        return mapToDto(certification);
    }

    async createCertification(input: CreateCertificationInput): Promise<CertificationDto> {
        const certification = await certificationRepository.create({
            name: input.name,
            organization: input.organization,
            issueDate: new Date(input.issueDate),
            expirationDate: input.expirationDate ? new Date(input.expirationDate) : null,
            credentialId: input.credentialId,
            credentialUrl: input.credentialUrl,
            skills: input.skills,
            mediaUrl: input.mediaUrl,
            mediaType: input.mediaType,
        });
        return mapToDto(certification);
    }

    async updateCertification(id: string, input: UpdateCertificationInput): Promise<CertificationDto> {
        const existing = await certificationRepository.findById(id);
        if (!existing) {
            throw AppError.notFound("Certification");
        }
        const certification = await certificationRepository.update(id, {
            name: input.name,
            organization: input.organization,
            issueDate: new Date(input.issueDate),
            expirationDate: input.expirationDate ? new Date(input.expirationDate) : null,
            credentialId: input.credentialId,
            credentialUrl: input.credentialUrl,
            skills: input.skills,
            mediaUrl: input.mediaUrl,
            mediaType: input.mediaType,
        });
        return mapToDto(certification);
    }

    async deleteCertification(id: string): Promise<void> {
        const existing = await certificationRepository.findById(id);
        if (!existing) {
            throw AppError.notFound("Certification");
        }
        await certificationRepository.delete(id);
    }
}

export const certificationService = new CertificationService();
