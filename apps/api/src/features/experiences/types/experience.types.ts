export interface ExperienceEntity {
    id: string;
    company: string;
    position: string;
    startDate: Date;
    endDate: Date | null;
    current: boolean;
    description: string;
    technologies: string[];
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ExperienceDto {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string | null;
    current: boolean;
    description: string;
    technologies: string[];
}

export interface CreateExperienceDto {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
    description: string;
    technologies?: string[];
}

export interface UpdateExperienceDto extends CreateExperienceDto { }
