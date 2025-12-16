import { dummyData } from '@/data/dummy';
import ExperiencesClient from './ExperiencesClient';

export default function ExperiencesPage() {
    return <ExperiencesClient initialData={dummyData.experiences} />;
}
