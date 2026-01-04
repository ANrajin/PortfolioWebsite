export interface SkillEntity {
    id: string;
    name: string;
    category: string;
    proficiency: number;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface SkillDto {
    id: string;
    name: string;
    category: string;
    proficiency: number;
}

export interface CreateSkillDto {
    name: string;
    category: string;
    proficiency?: number;
}

export interface UpdateSkillDto extends CreateSkillDto { }
