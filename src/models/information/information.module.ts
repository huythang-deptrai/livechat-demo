import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InformationRepository } from "src/repositories/information.repository";
import { InformationController } from "./information.controller";
import { InformationService } from "./information.service";

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([InformationRepository])],
  controllers: [InformationController],
  providers: [InformationService, ConfigModule],
  exports: [InformationService],
})
export class InformationModule {}