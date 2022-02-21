import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Profile } from "src/entities/profile.entity";
import { ProfilesRepository } from "src/repositories/profiles.repository";
import { ProfileEntity } from "src/serializers/profile.serializer";

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(ProfilesRepository)
    private profilesRepository: ProfilesRepository,
  ) {}

  async findAll(
    relations: string[] = [],
    throwsException = false,
  ): Promise<ProfileEntity[]> {
    return await this.profilesRepository.getAllEntity(
      relations,
      throwsException,
    );
  }

  async create(inputs: Profile): Promise<ProfileEntity> {
    return await this.profilesRepository.createEntity(inputs);
  }

  async findById(
    id: number,
    relations: string[] = [],
    throwsException = false,
  ): Promise<ProfileEntity> {
    return await this.profilesRepository.getEntityById(
      id,
      relations,
      throwsException,
    );
  }

  async update(
    profile: ProfileEntity,
    inputs: Profile,
  ): Promise<ProfileEntity> {
    return await this.profilesRepository.updateEntity(profile, inputs);
  }

  async deleteById(id: number): Promise<boolean> {
    return await this.profilesRepository.deleteEntityById(id);
  }
}