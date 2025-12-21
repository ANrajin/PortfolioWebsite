import { getCertifications } from '@/lib/api';
import type { Certification } from '@portfolio/shared';
import CertificationsClient from './CertificationsClient';

export const dynamic = 'force-dynamic';

export default async function CertificationsPage() {
    let certifications: Certification[] = [];

    try {
        certifications = await getCertifications();
    } catch (error) {
        console.warn('Failed to fetch certifications:', error);
    }

    return <CertificationsClient initialData={certifications} />;
}
