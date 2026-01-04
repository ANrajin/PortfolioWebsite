import { projectRepository } from "../repositories/project.repository.js";
import { AppError } from "../../../shared/errors/app-error.js";
import type { ProjectDto, ProjectEntity } from "../types/project.types.js";
import type { CreateProjectInput, UpdateProjectInput } from "../validators/project.validator.js";

function mapToDto(entity: ProjectEntity): ProjectDto {
    return {
        id: entity.id,
        title: entity.title,
        description: entity.description,
        ...(entity.link && { link: entity.link }),
        technologies: entity.technologies,
        ...(entity.imageUrl && { imageUrl: entity.imageUrl }),
    };
}

export class ProjectService {
    async getAllProjects(): Promise<ProjectDto[]> {
        const projects = await projectRepository.findAll();
        return projects.map(mapToDto);
    }

    async getProjectById(id: string): Promise<ProjectDto> {
        const project = await projectRepository.findById(id);
        if (!project) throw AppError.notFound("Project");
        return mapToDto(project);
    }

    async createProject(input: CreateProjectInput): Promise<ProjectDto> {
        const project = await projectRepository.create(input);
        return mapToDto(project);
    }

    async updateProject(id: string, input: UpdateProjectInput): Promise<ProjectDto> {
        const existing = await projectRepository.findById(id);
        if (!existing) throw AppError.notFound("Project");
        const project = await projectRepository.update(id, input);
        return mapToDto(project);
    }

    async deleteProject(id: string): Promise<void> {
        const existing = await projectRepository.findById(id);
        if (!existing) throw AppError.notFound("Project");
        await projectRepository.delete(id);
    }
}

export const projectService = new ProjectService();
