import { personalInfoRepository } from "../repositories/personal-info.repository.js";
import type { PersonalInfoDto, PersonalInfoEntity, SocialLinkEntity } from "../types/personal-info.types.js";
import type { UpdatePersonalInfoInput } from "../validators/personal-info.validator.js";

function mapToDto(entity: PersonalInfoEntity): PersonalInfoDto {
    return {
        id: entity.id,
        name: entity.name,
        title: entity.title,
        email: entity.email,
        phone: entity.phone,
        imageUrl: entity.imageUrl || "",
        careerObjective: entity.careerObjective,
        socialLinks: (entity.socialLinks || []).map((link: SocialLinkEntity) => ({
            id: link.id,
            platform: link.platform,
            url: link.url,
            label: link.label,
        })),
    };
}

export class PersonalInfoService {
    async getPersonalInfo(): Promise<PersonalInfoDto | null> {
        const info = await personalInfoRepository.findFirst();
        return info ? mapToDto(info) : null;
    }

    async updatePersonalInfo(input: UpdatePersonalInfoInput): Promise<PersonalInfoDto> {
        const info = await personalInfoRepository.upsert(input);
        return mapToDto(info);
    }
}

export const personalInfoService = new PersonalInfoService();
