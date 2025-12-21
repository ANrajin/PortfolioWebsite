import type { PortfolioData, PersonalInfo, Experience, Skill, Project, Education, Article } from "@portfolio/shared";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
    });

    if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
    }

    if (res.status === 204) {
        return undefined as T;
    }

    return res.json();
}

// Portfolio
export async function getPortfolio(): Promise<PortfolioData> {
    return fetchAPI<PortfolioData>("/api/portfolio");
}

// Personal Info
export async function getPersonalInfo(): Promise<PersonalInfo | null> {
    return fetchAPI<PersonalInfo | null>("/api/personal-info");
}

export async function updatePersonalInfo(data: PersonalInfo): Promise<PersonalInfo> {
    return fetchAPI<PersonalInfo>("/api/personal-info", {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

// Experiences
export async function getExperiences(): Promise<Experience[]> {
    return fetchAPI<Experience[]>("/api/experiences");
}

export async function createExperience(data: Omit<Experience, "id">): Promise<Experience> {
    return fetchAPI<Experience>("/api/experiences", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function updateExperience(id: string, data: Partial<Experience>): Promise<Experience> {
    return fetchAPI<Experience>(`/api/experiences/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

export async function deleteExperience(id: string): Promise<void> {
    return fetchAPI<void>(`/api/experiences/${id}`, { method: "DELETE" });
}

// Skills
export async function getSkills(): Promise<Skill[]> {
    return fetchAPI<Skill[]>("/api/skills");
}

export async function createSkill(data: Omit<Skill, "id">): Promise<Skill> {
    return fetchAPI<Skill>("/api/skills", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function updateSkill(id: string, data: Partial<Skill>): Promise<Skill> {
    return fetchAPI<Skill>(`/api/skills/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

export async function deleteSkill(id: string): Promise<void> {
    return fetchAPI<void>(`/api/skills/${id}`, { method: "DELETE" });
}

// Projects
export async function getProjects(): Promise<Project[]> {
    return fetchAPI<Project[]>("/api/projects");
}

export async function createProject(data: Omit<Project, "id">): Promise<Project> {
    return fetchAPI<Project>("/api/projects", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function updateProject(id: string, data: Partial<Project>): Promise<Project> {
    return fetchAPI<Project>(`/api/projects/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

export async function deleteProject(id: string): Promise<void> {
    return fetchAPI<void>(`/api/projects/${id}`, { method: "DELETE" });
}

// Education
export async function getEducation(): Promise<Education[]> {
    return fetchAPI<Education[]>("/api/education");
}

export async function createEducation(data: Omit<Education, "id">): Promise<Education> {
    return fetchAPI<Education>("/api/education", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function updateEducation(id: string, data: Partial<Education>): Promise<Education> {
    return fetchAPI<Education>(`/api/education/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

export async function deleteEducation(id: string): Promise<void> {
    return fetchAPI<void>(`/api/education/${id}`, { method: "DELETE" });
}

// Articles
export async function getArticles(): Promise<Article[]> {
    return fetchAPI<Article[]>("/api/articles");
}

export async function createArticle(data: Omit<Article, "id">): Promise<Article> {
    return fetchAPI<Article>("/api/articles", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function updateArticle(id: string, data: Partial<Article>): Promise<Article> {
    return fetchAPI<Article>(`/api/articles/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

export async function deleteArticle(id: string): Promise<void> {
    return fetchAPI<void>(`/api/articles/${id}`, { method: "DELETE" });
}

// Certifications
import type { Certification } from "@portfolio/shared";

export async function getCertifications(): Promise<Certification[]> {
    return fetchAPI<Certification[]>("/api/certifications");
}

export async function createCertification(data: Omit<Certification, "id">): Promise<Certification> {
    return fetchAPI<Certification>("/api/certifications", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function updateCertification(id: string, data: Partial<Certification>): Promise<Certification> {
    return fetchAPI<Certification>(`/api/certifications/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

export async function deleteCertification(id: string): Promise<void> {
    return fetchAPI<void>(`/api/certifications/${id}`, { method: "DELETE" });
}

// File Upload
export async function uploadCertificateMedia(file: File): Promise<{ mediaUrl: string; mediaType: string; filename: string }> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_URL}/api/upload/certificate`, {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        throw new Error(`Upload Error: ${res.status}`);
    }

    return res.json();
}

