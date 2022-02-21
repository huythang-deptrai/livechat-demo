import { classToPlain, plainToClass } from "class-transformer";
import { Pagination } from "src/common/pagination";
import { Message } from "src/entities/message.entity";
import { MessageEntity } from "src/serializers/message.serializer";
import { EntityRepository } from "typeorm";
import { BaseRepository } from "./base.repository";

@EntityRepository(Message)
export class MessagesRepository extends BaseRepository<
  Message,
  MessageEntity
> {
  async findAllPaginate(
    conversation_id: number | string,
    take: number | null,
    page: number | null,
    relations: string[] = [],
  ): Promise<Pagination<MessageEntity>> {
    const takeRecord = take || 30;
    const paginate = page || 1;
    const skip = (paginate - 1) * takeRecord;
    const [results, total] = await this.findAndCount({
      where: { conversation_id },
      order: { id: 'DESC' },
      relations,
      take: takeRecord,
      skip: skip,
    });

    return new Pagination<MessageEntity>({
      results,
      total,
    });
  }
  transform(model: Message): MessageEntity {
    const transformOptions = {};

    return plainToClass(
      MessageEntity,
      classToPlain(model, transformOptions),
      transformOptions,
    );
  }

  transformMany(models: Message[]): MessageEntity[] {
    return models.map((model) => this.transform(model));
  }
}