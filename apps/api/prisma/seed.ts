import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding database...");

    // Create personal info
    const personalInfo = await prisma.personalInfo.upsert({
        where: { id: "default" },
        update: {},
        create: {
            id: "default",
            name: "John Doe",
            title: "Senior Software Engineer",
            email: "john.doe@example.com",
            phone: "+1 (555) 123-4567",
            imageUrl: "",
            careerObjective: "Passionate software engineer with 5+ years of experience building scalable web applications. I thrive on solving complex problems and creating elegant solutions that make a real impact. Currently focused on full-stack development with modern technologies like React, Node.js, and cloud platforms.",
        },
    });

    // Create social links
    await prisma.socialLink.createMany({
        data: [
            { platform: "linkedin", url: "https://linkedin.com/in/johndoe", label: "LinkedIn", personalInfoId: personalInfo.id },
            { platform: "github", url: "https://github.com/johndoe", label: "GitHub", personalInfoId: personalInfo.id },
            { platform: "codeforces", url: "https://codeforces.com/profile/johndoe", label: "Codeforces", personalInfoId: personalInfo.id },
            { platform: "leetcode", url: "https://leetcode.com/johndoe", label: "LeetCode", personalInfoId: personalInfo.id },
        ],
        skipDuplicates: true,
    });

    // Create experiences
    await prisma.experience.createMany({
        data: [
            {
                company: "TechCorp Inc.",
                position: "Senior Software Engineer",
                startDate: new Date("2022-01-01"),
                endDate: null,
                current: true,
                description: "Leading a team of 5 engineers to build and maintain a high-traffic e-commerce platform serving millions of users. Architected microservices infrastructure that improved system reliability by 40%. Implemented CI/CD pipelines reducing deployment time by 60%.",
                technologies: JSON.stringify(["React", "Node.js", "TypeScript", "AWS", "PostgreSQL", "Redis"]),
                sortOrder: 0,
            },
            {
                company: "StartupXYZ",
                position: "Full Stack Developer",
                startDate: new Date("2020-03-01"),
                endDate: new Date("2021-12-31"),
                current: false,
                description: "Developed and launched a SaaS product from scratch, handling everything from database design to frontend implementation. Integrated payment systems and built real-time collaboration features using WebSockets.",
                technologies: JSON.stringify(["Vue.js", "Python", "Django", "MongoDB", "Docker"]),
                sortOrder: 1,
            },
            {
                company: "Digital Agency Pro",
                position: "Junior Developer",
                startDate: new Date("2018-06-01"),
                endDate: new Date("2020-02-28"),
                current: false,
                description: "Built responsive websites and web applications for diverse clients. Collaborated with designers to implement pixel-perfect UIs. Maintained and improved legacy codebases while learning best practices.",
                technologies: JSON.stringify(["JavaScript", "React", "PHP", "MySQL", "SASS"]),
                sortOrder: 2,
            },
        ],
        skipDuplicates: true,
    });

    // Create skills
    await prisma.skill.createMany({
        data: [
            { name: "React / Next.js", category: "frontend", proficiency: 95, sortOrder: 0 },
            { name: "TypeScript", category: "frontend", proficiency: 90, sortOrder: 1 },
            { name: "Vue.js", category: "frontend", proficiency: 80, sortOrder: 2 },
            { name: "Tailwind CSS", category: "frontend", proficiency: 92, sortOrder: 3 },
            { name: "Node.js", category: "backend", proficiency: 88, sortOrder: 4 },
            { name: "Express.js", category: "backend", proficiency: 85, sortOrder: 5 },
            { name: "Python", category: "backend", proficiency: 75, sortOrder: 6 },
            { name: "GraphQL", category: "backend", proficiency: 78, sortOrder: 7 },
            { name: "PostgreSQL", category: "database", proficiency: 85, sortOrder: 8 },
            { name: "MongoDB", category: "database", proficiency: 80, sortOrder: 9 },
            { name: "Redis", category: "database", proficiency: 72, sortOrder: 10 },
            { name: "Docker", category: "devops", proficiency: 82, sortOrder: 11 },
            { name: "AWS", category: "devops", proficiency: 78, sortOrder: 12 },
            { name: "CI/CD", category: "devops", proficiency: 80, sortOrder: 13 },
            { name: "Git", category: "tools", proficiency: 95, sortOrder: 14 },
            { name: "VS Code", category: "tools", proficiency: 92, sortOrder: 15 },
        ],
        skipDuplicates: true,
    });

    // Create projects
    await prisma.project.createMany({
        data: [
            {
                title: "E-Commerce Platform",
                description: "Full-featured e-commerce solution with real-time inventory management, payment processing, and analytics dashboard.",
                link: "https://github.com/johndoe/ecommerce-platform",
                technologies: JSON.stringify(["Next.js", "Node.js", "PostgreSQL", "Stripe"]),
                sortOrder: 0,
            },
            {
                title: "Task Management App",
                description: "Collaborative project management tool with drag-and-drop kanban boards, real-time updates, and team chat.",
                link: "https://github.com/johndoe/task-manager",
                technologies: JSON.stringify(["React", "Socket.io", "MongoDB", "Express"]),
                sortOrder: 1,
            },
            {
                title: "AI Chat Assistant",
                description: "Intelligent chatbot powered by OpenAI GPT, with custom training capabilities and analytics.",
                link: "https://github.com/johndoe/ai-assistant",
                technologies: JSON.stringify(["Python", "FastAPI", "OpenAI", "Redis"]),
                sortOrder: 2,
            },
            {
                title: "Real-time Analytics Dashboard",
                description: "Data visualization platform processing millions of events with sub-second latency.",
                technologies: JSON.stringify(["Vue.js", "D3.js", "Kafka", "ClickHouse"]),
                sortOrder: 3,
            },
            {
                title: "Mobile Banking App",
                description: "Secure mobile banking application with biometric authentication and instant transfers.",
                link: "https://github.com/johndoe/mobile-banking",
                technologies: JSON.stringify(["React Native", "Node.js", "PostgreSQL"]),
                sortOrder: 4,
            },
            {
                title: "DevOps Automation Tool",
                description: "Infrastructure-as-code tool that simplifies cloud deployments and monitoring.",
                technologies: JSON.stringify(["Go", "Terraform", "AWS", "Prometheus"]),
                sortOrder: 5,
            },
        ],
        skipDuplicates: true,
    });

    // Create education
    await prisma.education.createMany({
        data: [
            {
                institution: "Massachusetts Institute of Technology",
                degree: "Master of Science",
                field: "Computer Science",
                startYear: 2016,
                endYear: 2018,
                current: false,
                description: "Specialized in Distributed Systems and Machine Learning. Research focused on scalable data processing algorithms.",
                sortOrder: 0,
            },
            {
                institution: "University of California, Berkeley",
                degree: "Bachelor of Science",
                field: "Computer Science",
                startYear: 2012,
                endYear: 2016,
                current: false,
                description: "Graduated with honors. Active member of the university's programming club and hackathon organizer.",
                sortOrder: 1,
            },
        ],
        skipDuplicates: true,
    });

    // Create articles
    await prisma.article.createMany({
        data: [
            {
                title: "Building Scalable Microservices with Node.js",
                platform: "Medium",
                url: "https://medium.com/@johndoe/building-scalable-microservices",
                publishedDate: new Date("2024-01-15"),
                sortOrder: 0,
            },
            {
                title: "A Complete Guide to TypeScript Generics",
                platform: "Dev.to",
                url: "https://dev.to/johndoe/typescript-generics-guide",
                publishedDate: new Date("2023-11-20"),
                sortOrder: 1,
            },
            {
                title: "React Performance Optimization Techniques",
                platform: "Medium",
                url: "https://medium.com/@johndoe/react-performance-optimization",
                publishedDate: new Date("2023-09-05"),
                sortOrder: 2,
            },
            {
                title: "Getting Started with AWS Lambda",
                platform: "Hashnode",
                url: "https://hashnode.com/@johndoe/aws-lambda-getting-started",
                publishedDate: new Date("2023-07-12"),
                sortOrder: 3,
            },
            {
                title: "Database Design Best Practices",
                platform: "Medium",
                url: "https://medium.com/@johndoe/database-design-best-practices",
                publishedDate: new Date("2023-05-28"),
                sortOrder: 4,
            },
            {
                title: "CI/CD Pipelines with GitHub Actions",
                platform: "Dev.to",
                url: "https://dev.to/johndoe/cicd-github-actions",
                publishedDate: new Date("2023-03-10"),
                sortOrder: 5,
            },
        ],
        skipDuplicates: true,
    });

    console.log("✅ Database seeded successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
