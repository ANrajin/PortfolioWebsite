import { getSkills } from '@/lib/api';
import { dummyData } from '@/data/dummy';
import SkillsClient from './SkillsClient';

export const dynamic = 'force-dynamic';

export default async function SkillsPage() {
    let skills;

    try {
        skills = await getSkills();
    } catch (error) {
        console.warn('Failed to fetch from API, using dummy data:', error);
        skills = dummyData.skills;
    }

    return <SkillsClient initialData={skills} />;
}
