import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserConversation } from "src/entities/user-conversation.entity";
import { UserConversationRepository } from "src/repositories/user-conversation.repository";
import { UserConversationEntity } from "src/serializers/user-conversation.serializer";

@Injectable()
export class UserConversationService {
  constructor(
    @InjectRepository(UserConversationRepository)
    private userConversationRepository: UserConversationRepository,
  ) {}

  async findAll(
    relations: string[] = [],
    throwsException = false,
  ): Promise<UserConversationEntity[]> {
    return await this.userConversationRepository.getAllEntity(
      relations,
      throwsException,
    );
  }

  async create(inputs: UserConversation): Promise<UserConversationEntity> {
    return await this.userConversationRepository.createEntity(inputs);
  }

  async findById(
    id: number,
    relations: string[] = [],
    throwsException = false,
  ): Promise<UserConversationEntity> {
    return await this.userConversationRepository.getEntityById(
      id,
      relations,
      throwsException,
    );
  }

  async update(
    UserConversation: UserConversationEntity,
    inputs: UserConversation,
  ): Promise<UserConversationEntity> {
    return await this.userConversationRepository.updateEntity(
      UserConversation,
      inputs,
    );
  }

  async findDataUserConversation(
    user_id: number,
    conversation_id: number,
  ): Promise<UserConversationEntity> {
    return await this.userConversationRepository.findDataUserConversation(
      user_id,
      conversation_id,
    );
  }

  async updateLastMessageId(
    userConversation: UserConversationEntity,
    last_message_id: number,
  ): Promise<UserConversationEntity> {
    return await this.userConversationRepository.updateLastMessageId(
      userConversation,
      last_message_id,
    );
  }

  async deleteById(id: number): Promise<boolean> {
    return await this.userConversationRepository.deleteEntityById(id);
  }
}