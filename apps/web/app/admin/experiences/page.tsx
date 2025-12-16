import { getExperiences } from '@/lib/api';
import { dummyData } from '@/data/dummy';
import ExperiencesClient from './ExperiencesClient';

export const dynamic = 'force-dynamic';

export default async function ExperiencesPage() {
    let experiences;

    try {
        experiences = await getExperiences();
    } catch (error) {
        console.warn('Failed to fetch from API, using dummy data:', error);
        experiences = dummyData.experiences;
    }

    return <ExperiencesClient initialData={experiences} />;
}
