export interface ProjectEntity {
    id: string;
    title: string;
    description: string;
    link: string | null;
    technologies: string[];
    imageUrl: string | null;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProjectDto {
    id: string;
    title: string;
    description: string;
    link?: string;
    technologies: string[];
    imageUrl?: string;
}

export interface CreateProjectDto {
    title: string;
    description: string;
    link?: string;
    technologies?: string[];
    imageUrl?: string;
}

export interface UpdateProjectDto extends CreateProjectDto { }
