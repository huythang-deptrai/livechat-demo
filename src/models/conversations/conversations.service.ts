import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Conversation } from "src/entities/conversation.entity";
import { ConversationsRepository } from "src/repositories/conversations.repository";
import { ConversationEntity } from "src/serializers/conversation.serializer";

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(ConversationsRepository)
    private conversationRepository: ConversationsRepository,
  ) {}

  async findAll(
    relations: string[] = [],
    throwsException = false,
  ): Promise<ConversationEntity[]> {
    return await this.conversationRepository.getAllEntity(
      relations,
      throwsException,
    );
  }

  async create(inputs: Conversation): Promise<ConversationEntity> {
    return await this.conversationRepository.createEntity(inputs);
  }

  async findById(
    id: number,
    relations: string[] = [],
    throwsException = false,
  ): Promise<ConversationEntity> {
    return await this.conversationRepository.getEntityById(
      id,
      relations,
      throwsException,
    );
  }

  async update(
    conversation: ConversationEntity,
    inputs: Conversation,
  ): Promise<ConversationEntity> {
    return await this.conversationRepository.updateEntity(conversation, inputs);
  }

  async deleteById(id: number): Promise<boolean> {
    return await this.conversationRepository.deleteEntityById(id);
  }
}