import { classToPlain, plainToClass } from "class-transformer";
import { Information } from "src/entities/information.entity";
import { TypeInformation } from "src/interfaces/information.interface";
import { InformationEntity } from "src/serializers/information.serializer";
import { EntityRepository, In } from "typeorm";
import { BaseRepository } from "./base.repository";

@EntityRepository(Information)
export class InformationRepository extends BaseRepository<
  Information,
  InformationEntity
> {
  async findSocketId(user_id: number[]) {
    return await this.find({
      where: { user_id: In(user_id), type: TypeInformation.socket_id },
      select: ['value'],
    });
  }

  async deleteByValue(
    user_id: number | string,
    value: string,
  ): Promise<boolean> {
    return await this.delete({
      user_id,
      value,
    })
      .then(() => {
        return true;
      })
      .catch((error) => Promise.reject(error));
  }
  transform(model: Information): InformationEntity {
    const transformOptions = {};

    return plainToClass(
      InformationEntity,
      classToPlain(model, transformOptions),
      transformOptions,
    );
  }

  transformMany(models: Information[]): InformationEntity[] {
    return models.map((model) => this.transform(model));
  }
}