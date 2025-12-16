import { getArticles } from '@/lib/api';
import { dummyData } from '@/data/dummy';
import ArticlesClient from './ArticlesClient';

export const dynamic = 'force-dynamic';

export default async function ArticlesPage() {
    let articles;

    try {
        articles = await getArticles();
    } catch (error) {
        console.warn('Failed to fetch from API, using dummy data:', error);
        articles = dummyData.articles;
    }

    return <ArticlesClient initialData={articles} />;
}
