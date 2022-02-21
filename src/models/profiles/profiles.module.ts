import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfilesRepository } from "src/repositories/profiles.repository";
import { ProfilesController } from "./profiles.controller";
import { ProfilesService } from "./profiles.service";

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([ProfilesRepository])],
  controllers: [ProfilesController],
  providers: [ProfilesService, ConfigModule],
  exports: [ProfilesService],
})
export class ProfilesModule {}