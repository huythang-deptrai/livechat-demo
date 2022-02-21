import { classToPlain, plainToClass } from "class-transformer";
import { Conversation } from "src/entities/conversation.entity";
import { ConversationEntity } from "src/serializers/conversation.serializer";
import { EntityRepository } from "typeorm";
import { BaseRepository } from "./base.repository";

@EntityRepository(Conversation)
export class ConversationsRepository extends BaseRepository<
  Conversation,
  ConversationEntity
> {
  transform(model: Conversation): ConversationEntity {
    const transformOptions = {};

    return plainToClass(
      ConversationEntity,
      classToPlain(model, transformOptions),
      transformOptions,
    );
  }

  transformMany(models: Conversation[]): ConversationEntity[] {
    return models.map((model) => this.transform(model));
  }
}