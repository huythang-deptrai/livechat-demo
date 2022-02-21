import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessagesRepository } from "src/repositories/messages.repository";
import { MessagesService } from "./mesages.service";
import { MessagesController } from "./messages.controller";

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([MessagesRepository])],
  controllers: [MessagesController],
  providers: [MessagesService, ConfigModule],
  exports: [MessagesService],
})
export class MessagesModule {}