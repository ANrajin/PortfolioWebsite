export interface SocialLinkEntity {
    id: string;
    platform: string;
    url: string;
    label: string;
    personalInfoId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface PersonalInfoEntity {
    id: string;
    name: string;
    title: string;
    email: string;
    phone: string;
    imageUrl: string | null;
    careerObjective: string;
    socialLinks?: SocialLinkEntity[];
    createdAt: Date;
    updatedAt: Date;
}

export interface SocialLinkDto {
    id: string;
    platform: string;
    url: string;
    label: string;
}

export interface PersonalInfoDto {
    id: string;
    name: string;
    title: string;
    email: string;
    phone: string;
    imageUrl: string;
    careerObjective: string;
    socialLinks: SocialLinkDto[];
}

export interface UpdatePersonalInfoDto {
    id?: string;
    name: string;
    title: string;
    email: string;
    phone: string;
    imageUrl?: string;
    careerObjective: string;
    socialLinks?: { platform: string; url: string; label: string }[];
}
