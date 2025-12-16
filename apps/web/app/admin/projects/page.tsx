import { dummyData } from '@/data/dummy';
import ProjectsClient from './ProjectsClient';

export default function ProjectsPage() {
    return <ProjectsClient initialData={dummyData.projects} />;
}
