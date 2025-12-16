import { dummyData } from '@/data/dummy';
import InformationForm from './InformationForm';

export default function InformationPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-100">Personal Information</h2>
                <p className="text-slate-400 mt-1">Manage your profile details and social links.</p>
            </div>

            <InformationForm initialData={dummyData.personalInfo} />
        </div>
    );
}
