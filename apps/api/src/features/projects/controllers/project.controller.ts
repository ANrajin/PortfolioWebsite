import type { Request, Response } from "express";
import { projectService } from "../services/project.service.js";
import type { ApiResponse } from "../../../shared/types/api.types.js";
import type { ProjectDto } from "../types/project.types.js";
import type { CreateProjectInput, UpdateProjectInput } from "../validators/project.validator.js";

export class ProjectController {
    async getAll(req: Request, res: Response<ApiResponse<ProjectDto[]>>): Promise<void> {
        const projects = await projectService.getAllProjects();
        res.json({ success: true, data: projects });
    }

    async getById(req: Request, res: Response<ApiResponse<ProjectDto>>): Promise<void> {
        const id = req.params.id as string;
        const project = await projectService.getProjectById(id);
        res.json({ success: true, data: project });
    }

    async create(req: Request, res: Response<ApiResponse<ProjectDto>>): Promise<void> {
        const input = req.body as CreateProjectInput;
        const project = await projectService.createProject(input);
        res.status(201).json({ success: true, data: project });
    }

    async update(req: Request, res: Response<ApiResponse<ProjectDto>>): Promise<void> {
        const id = req.params.id as string;
        const input = req.body as UpdateProjectInput;
        const project = await projectService.updateProject(id, input);
        res.json({ success: true, data: project });
    }

    async delete(req: Request, res: Response<ApiResponse<null>>): Promise<void> {
        const id = req.params.id as string;
        await projectService.deleteProject(id);
        res.status(204).send();
    }
}

export const projectController = new ProjectController();
