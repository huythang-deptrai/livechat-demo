import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JsonWebTokenStrategy } from "src/auth/strategies/jwt-strategy";
import { UsersRepository } from "src/repositories/users.repository";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([UsersRepository])],
  controllers: [UsersController],
  providers: [UsersService, ConfigModule, JsonWebTokenStrategy],
  exports: [UsersService],
})
export class UsersModule {}