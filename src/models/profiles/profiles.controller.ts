import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { Profile } from "src/entities/profile.entity";
import { ProfileEntity } from "src/serializers/profile.serializer";
import { ProfilesService } from "./profiles.service";

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profileService: ProfilesService) {}

  @Get('/')
  async index() {
    return this.profileService.findAll();
  }

  @Get('/:id')
  async getById(@Param() params): Promise<ProfileEntity> {
    const Profile = await this.profileService.findById(params.id);
    this.throwProfileNotFound(Profile);
    return Profile;
  }

  @Post('/')
  async create(@Body() inputs: Profile): Promise<ProfileEntity> {
    return await this.profileService.create(inputs);
  }

  @Put('/:id')
  async update(
    @Param() params,
    @Body() inputs: Profile,
  ): Promise<ProfileEntity> {
    const Profile = await this.profileService.findById(parseInt(params.id, 0));
    this.throwProfileNotFound(Profile);
    return await this.profileService.update(Profile, inputs);
  }

  @Delete('/:id')
  async delete(@Param() params): Promise<boolean> {
    const Profile = await this.profileService.findById(parseInt(params.id, 0));
    this.throwProfileNotFound(Profile);
    return await this.profileService.deleteById(params.id);
  }

  throwProfileNotFound(Profile: ProfileEntity) {
    if (!Profile) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}