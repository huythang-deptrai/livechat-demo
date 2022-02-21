import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EXPIRES_TIME, JWT_SECRET_KEY } from "src/config/constant";
import { ConversationsModule } from "src/models/conversations/conversations.module";
import { InformationModule } from "src/models/information/information.module";
import { MessagesModule } from "src/models/messages/messages.module";
import { UsersModule } from "src/models/users/users.module";
import { UsersService } from "src/models/users/users.service";
import { UserConversationModule } from "src/models/user_conversation/user-conversation.module";
import { ConversationsRepository } from "src/repositories/conversations.repository";
import { InformationRepository } from "src/repositories/information.repository";
import { MessagesRepository } from "src/repositories/messages.repository";
import { UserConversationRepository } from "src/repositories/user-conversation.repository";
import { UsersRepository } from "src/repositories/users.repository";
import { AppGateway } from "./app.gateway";

@Module({
  imports: [
    UsersModule,
    InformationModule,
    ConversationsModule,
    MessagesModule,
    UserConversationModule,
    TypeOrmModule.forFeature([
      UsersRepository,
      InformationRepository,
      ConversationsRepository,
      MessagesRepository,
      UserConversationRepository,
    ]),
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: EXPIRES_TIME },
    }),
  ],
  providers: [AppGateway, UsersService],
  controllers: [],
})
export class GatewayModules {}