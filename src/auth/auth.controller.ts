import { Body, Controller, HttpException, HttpStatus, Post, UseGuards, Request, Get } from "@nestjs/common";
import { AuthPayload } from "src/interfaces/auth-payload.interface";
import { CreateUserDto } from "src/models/users/dto/create-user.dto";
import { UsersService } from "src/models/users/users.service";
import { AuthService } from "./auth.service";
import { AuthenticationGuard } from "./guards/auth.guards";
import { LocalAuthGuard } from "./guards/local.guard";

@Controller()
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/register')
  async registerUser(@Body() input: CreateUserDto) {
    const check = await this.validate(input.email);
    if (!check) {
      throw new HttpException(
        { message: 'User already exists' },
        HttpStatus.BAD_REQUEST,
      );
    }

    input.password = await this.authService.hashPassword(input.password);
    return this.userService.create(input);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() request): Promise<any> {
    return this.authService.login(request.user);
  }

  @UseGuards(AuthenticationGuard)
  @Get('current-user')
  async getUserLoggedIn(@Request() request): Promise<AuthPayload> {
    return request.user;
  }

  async validate(email: string) {
    try {
      const users = await this.userService.geUsersByEmail(email);
      return users.length <= 0;
    } catch (e) {
      return false;
    }
  }
}