import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from "src/interfaces/auth-payload.interface";
import { UsersService } from "src/models/users/users.service";
import { UserEntity } from "src/serializers/user.serializer";
import * as bcrypt from "bcryptjs"

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async comparePassword(
    password: string,
    storePasswordHash: string,
  ): Promise<any> {
    return await bcrypt.compare(password, storePasswordHash);
  }

  async authentication(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);
    const check = await this.comparePassword(password, user.password);

    if (!user || !check) {
      return false;
    }

    return user;
  }

  async login(user: UserEntity) {
    const payload: AuthPayload = {
      name: user.name,
      email: user.email,
      id: user.id,
    };

    return { token: this.jwtService.sign(payload), user };
  }
}