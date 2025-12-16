import { getProjects } from '@/lib/api';
import { dummyData } from '@/data/dummy';
import ProjectsClient from './ProjectsClient';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
    let projects;

    try {
        projects = await getProjects();
    } catch (error) {
        console.warn('Failed to fetch from API, using dummy data:', error);
        projects = dummyData.projects;
    }

    return <ProjectsClient initialData={projects} />;
}
