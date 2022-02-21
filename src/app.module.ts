import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './orm-config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './models/users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConversationsModule } from './models/conversations/conversations.module';
import { InformationModule } from './models/information/information.module';
import { ProfilesModule } from './models/profiles/profiles.module';
import { UserConversationModule } from './models/user_conversation/user-conversation.module';
import { GatewayModules } from './gatewaies/gateway.modules';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(config),
    UsersModule,
    AuthModule,
    ConversationsModule,
    InformationModule,
    ProfilesModule,
    UserConversationModule,
    GatewayModules
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
