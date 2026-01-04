export interface EducationEntity {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startYear: number;
    endYear: number | null;
    current: boolean;
    description: string | null;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface EducationDto {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startYear: number;
    endYear: number | null;
    current: boolean;
    description?: string;
}

export interface CreateEducationDto {
    institution: string;
    degree: string;
    field: string;
    startYear: number;
    endYear?: number;
    current?: boolean;
    description?: string;
}

export interface UpdateEducationDto extends CreateEducationDto { }
