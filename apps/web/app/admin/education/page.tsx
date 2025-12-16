import { dummyData } from '@/data/dummy';
import EducationClient from './EducationClient';

export default function EducationPage() {
    return <EducationClient initialData={dummyData.education} />;
}
