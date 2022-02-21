import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserConversationRepository } from "src/repositories/user-conversation.repository";
import { UserConversationController } from "./user-conversation.controller";
import { UserConversationService } from "./user-conversation.service";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserConversationRepository]),
  ],
  controllers: [UserConversationController],
  providers: [UserConversationService, ConfigModule],
  exports: [UserConversationService],
})
export class UserConversationModule {}