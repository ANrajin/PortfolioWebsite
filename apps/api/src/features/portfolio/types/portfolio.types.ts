import type { ArticleDto } from "../../articles/index.js";
import type { CertificationDto } from "../../certifications/index.js";
import type { EducationDto } from "../../education/types/education.types.js";
import type { ExperienceDto } from "../../experiences/index.js";
import type { PersonalInfoDto } from "../../personal-info/index.js";
import type { ProjectDto } from "../../projects/index.js";
import type { SkillDto } from "../../skills/index.js";

export interface PortfolioDto {
    personalInfo: PersonalInfoDto | null;
    experiences: ExperienceDto[];
    skills: SkillDto[];
    projects: ProjectDto[];
    education: EducationDto[];
    articles: ArticleDto[];
    certifications: CertificationDto[];
}
