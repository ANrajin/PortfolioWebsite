/** Article database entity from Prisma */
export interface ArticleEntity {
    id: string;
    title: string;
    platform: string;
    url: string;
    publishedDate: Date;
    thumbnail: string | null;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
}

/** Article response DTO */
export interface ArticleDto {
    id: string;
    title: string;
    platform: string;
    url: string;
    publishedDate: string;
    thumbnail?: string;
}

/** Create article request DTO */
export interface CreateArticleDto {
    title: string;
    platform: string;
    url: string;
    publishedDate: string;
    thumbnail?: string;
}

/** Update article request DTO */
export interface UpdateArticleDto {
    title: string;
    platform: string;
    url: string;
    publishedDate: string;
    thumbnail?: string;
}
