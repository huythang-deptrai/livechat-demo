import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JsonWebTokenStrategy } from "src/auth/strategies/jwt-strategy";
import { ConversationsRepository } from "src/repositories/conversations.repository";
import { ConversationsController } from "./conversations.controller";
import { ConversationsService } from "./conversations.service";

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([ConversationsRepository])],
  controllers: [ConversationsController],
  providers: [ConversationsService, ConfigModule, JsonWebTokenStrategy],
  exports: [ConversationsService],
})
export class ConversationsModule {}