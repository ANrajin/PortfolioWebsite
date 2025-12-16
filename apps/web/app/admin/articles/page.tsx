import { dummyData } from '@/data/dummy';
import ArticlesClient from './ArticlesClient';

export default function ArticlesPage() {
    return <ArticlesClient initialData={dummyData.articles} />;
}
