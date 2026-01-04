import { articleService } from "../../articles/services/article.service.js";
import { certificationService } from "../../certifications/services/certification.service.js";
import { educationService } from "../../education/services/education.service.js";
import { experienceService } from "../../experiences/services/experience.service.js";
import { personalInfoService } from "../../personal-info/services/personal-info.service.js";
import { projectService } from "../../projects/services/project.service.js";
import { skillService } from "../../skills/services/skill.service.js";
import type { PortfolioDto } from "../types/portfolio.types.js";

export class PortfolioService {
    async getFullPortfolio(): Promise<PortfolioDto> {
        const [personalInfo, experiences, skills, projects, education, articles, certifications] = await Promise.all([
            personalInfoService.getPersonalInfo(),
            experienceService.getAllExperiences(),
            skillService.getAllSkills(),
            projectService.getAllProjects(),
            educationService.getAllEducation(),
            articleService.getAllArticles(),
            certificationService.getAllCertifications(),
        ]);

        return {
            personalInfo,
            experiences,
            skills,
            projects,
            education,
            articles,
            certifications,
        };
    }
}

export const portfolioService = new PortfolioService();
