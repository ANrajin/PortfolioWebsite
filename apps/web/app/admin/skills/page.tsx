import { dummyData } from '@/data/dummy';
import SkillsClient from './SkillsClient';

export default function SkillsPage() {
    return <SkillsClient initialData={dummyData.skills} />;
}
