import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { InformationEntity } from "src/serializers/information.serializer";
import { SaveInformationDto } from "./dto/save.dto";
import { InformationService } from "./information.service";

@Controller('information')
export class InformationController {
  constructor(private readonly informationService: InformationService) {}

  @Get('/')
  async index() {
    return this.informationService.findAll();
  }

  @Get('/:id')
  async getById(@Param() params): Promise<InformationEntity> {
    const Information = await this.informationService.findById(params.id);
    this.throwInformationNotFound(Information);
    return Information;
  }

  @Post('/')
  async create(@Body() inputs: SaveInformationDto): Promise<InformationEntity> {
    return await this.informationService.create(inputs);
  }

  @Put('/:id')
  async update(
    @Param() params,
    @Body() inputs: SaveInformationDto,
  ): Promise<InformationEntity> {
    const Information = await this.informationService.findById(
      parseInt(params.id, 0),
    );
    this.throwInformationNotFound(Information);
    return await this.informationService.update(Information, inputs);
  }

  @Delete('/:id')
  async delete(@Param() params): Promise<boolean> {
    const Information = await this.informationService.findById(
      parseInt(params.id, 0),
    );
    this.throwInformationNotFound(Information);
    return await this.informationService.deleteById(params.id);
  }

  throwInformationNotFound(Information: InformationEntity) {
    if (!Information) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}