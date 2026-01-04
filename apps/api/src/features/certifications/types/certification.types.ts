export interface CertificationEntity {
    id: string;
    name: string;
    organization: string;
    issueDate: Date;
    expirationDate: Date | null;
    credentialId: string | null;
    credentialUrl: string | null;
    skills: string[];
    mediaUrl: string | null;
    mediaType: string | null;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface CertificationDto {
    id: string;
    name: string;
    organization: string;
    issueDate: string;
    expirationDate: string | null;
    credentialId?: string;
    credentialUrl?: string;
    skills: string[];
    mediaUrl?: string;
    mediaType?: string;
}

export interface CreateCertificationDto {
    name: string;
    organization: string;
    issueDate: string;
    expirationDate?: string;
    credentialId?: string;
    credentialUrl?: string;
    skills?: string[];
    mediaUrl?: string;
    mediaType?: string;
}

export type UpdateCertificationDto = CreateCertificationDto;
