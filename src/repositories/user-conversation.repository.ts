import { NotFoundException } from "@nestjs/common";
import { classToPlain, plainToClass } from "class-transformer";
import { UserConversation } from "src/entities/user-conversation.entity";
import { UserConversationEntity } from "src/serializers/user-conversation.serializer";
import { EntityRepository } from "typeorm";
import { BaseRepository } from "./base.repository";

@EntityRepository(UserConversation)
export class UserConversationRepository extends BaseRepository<
  UserConversation,
  UserConversationEntity
> {
  async findDataUserConversation(
    user_id,
    conversation_id,
  ): Promise<UserConversationEntity> {
    return this.findOne({
      where: { user_id, conversation_id },
    }).then((entity) => {
      if (!entity) {
        return Promise.reject(new NotFoundException('Model not found'));
      }

      return Promise.resolve(entity ? this.transform(entity) : null);
    });
  }

  async updateLastMessageId(
    entity: UserConversationEntity,
    last_messages_id: number,
    relations: string[] = [],
  ): Promise<UserConversationEntity> {
    return await this.update(entity.id, {
      ...entity,
      last_message_id: last_messages_id,
    })
      .then(async () => {
        return await this.getEntityById((entity as any).id, relations);
      })
      .catch((error) => Promise.reject(error));
  }

  transform(model: UserConversation): UserConversationEntity {
    const transformOptions = {};

    return plainToClass(
      UserConversationEntity,
      classToPlain(model, transformOptions),
      transformOptions,
    );
  }

  transformMany(models: UserConversation[]): UserConversationEntity[] {
    return models.map((model) => this.transform(model));
  }
}