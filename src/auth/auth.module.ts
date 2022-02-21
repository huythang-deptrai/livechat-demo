import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from '@nestjs/jwt';
import { EXPIRES_TIME, JWT_SECRET_KEY } from "src/config/constant";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersService } from "src/models/users/users.service";
import { JsonWebTokenStrategy } from "./strategies/jwt-strategy";
import { UsersRepository } from "src/repositories/users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LocalStrategy } from "./strategies/local.strategy";
import { UsersModule } from "src/models/users/users.module";


@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([UsersRepository]),
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: EXPIRES_TIME },
    }),
  ],
  providers: [AuthService, UsersService, LocalStrategy, JsonWebTokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}