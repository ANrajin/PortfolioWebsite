import { getPersonalInfo } from '@/lib/api';
import { dummyData } from '@/data/dummy';
import InformationForm from './InformationForm';

export const dynamic = 'force-dynamic';

export default async function InformationPage() {
    let personalInfo;

    try {
        personalInfo = await getPersonalInfo();
    } catch (error) {
        console.warn('Failed to fetch from API, using dummy data:', error);
        personalInfo = null;
    }

    // Fall back to dummy data if API fails or returns null
    const data = personalInfo || dummyData.personalInfo;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-100">Personal Information</h2>
                <p className="text-slate-400 mt-1">Manage your profile details and social links.</p>
            </div>

            <InformationForm initialData={data} />
        </div>
    );
}
