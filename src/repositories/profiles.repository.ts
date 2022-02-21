import { classToPlain, plainToClass } from "class-transformer";
import { Profile } from "src/entities/profile.entity";
import { ProfileEntity } from "src/serializers/profile.serializer";
import { EntityRepository } from "typeorm";
import { BaseRepository } from "./base.repository";

@EntityRepository(Profile)
export class ProfilesRepository extends BaseRepository<
  Profile,
  ProfileEntity
> {
  transform(model: Profile): ProfileEntity {
    const transformOptions = {};

    return plainToClass(
      ProfileEntity,
      classToPlain(model, transformOptions),
      transformOptions,
    );
  }

  transformMany(models: Profile[]): ProfileEntity[] {
    return models.map((model) => this.transform(model));
  }
}
