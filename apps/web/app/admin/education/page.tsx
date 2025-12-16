import { getEducation } from '@/lib/api';
import { dummyData } from '@/data/dummy';
import EducationClient from './EducationClient';

export const dynamic = 'force-dynamic';

export default async function EducationPage() {
    let education;

    try {
        education = await getEducation();
    } catch (error) {
        console.warn('Failed to fetch from API, using dummy data:', error);
        education = dummyData.education;
    }

    return <EducationClient initialData={education} />;
}
