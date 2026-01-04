import { prisma } from "@/lib/prisma.js";
import type { ProjectEntity } from "../types/project.types.js";

export interface CreateProjectData {
    title: string;
    description: string;
    link?: string;
    technologies?: string[];
    imageUrl?: string;
}

export type UpdateProjectData = CreateProjectData;

function parseTechnologies(techs: unknown): string[] {
    if (Array.isArray(techs)) return techs as string[];
    if (typeof techs === "string") {
        try { return JSON.parse(techs); } catch { return []; }
    }
    return [];
}

export class ProjectRepository {
    async findAll(): Promise<ProjectEntity[]> {
        const projects = await prisma.project.findMany({ orderBy: { sortOrder: "asc" } });
        return projects.map(p => ({ ...p, technologies: parseTechnologies(p.technologies) }));
    }

    async findById(id: string): Promise<ProjectEntity | null> {
        const project = await prisma.project.findUnique({ where: { id } });
        if (!project) return null;
        return { ...project, technologies: parseTechnologies(project.technologies) };
    }

    async create(data: CreateProjectData): Promise<ProjectEntity> {
        const project = await prisma.project.create({
            data: {
                title: data.title,
                description: data.description,
                link: data.link || null,
                technologies: data.technologies || [],
                imageUrl: data.imageUrl || null,
            },
        });
        return { ...project, technologies: parseTechnologies(project.technologies) };
    }

    async update(id: string, data: UpdateProjectData): Promise<ProjectEntity> {
        const project = await prisma.project.update({
            where: { id },
            data: {
                title: data.title,
                description: data.description,
                link: data.link || null,
                technologies: data.technologies || [],
                imageUrl: data.imageUrl || null,
            },
        });
        return { ...project, technologies: parseTechnologies(project.technologies) };
    }

    async delete(id: string): Promise<void> {
        await prisma.project.delete({ where: { id } });
    }
}

export const projectRepository = new ProjectRepository();
