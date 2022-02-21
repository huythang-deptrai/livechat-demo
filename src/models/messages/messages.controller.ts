import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { AuthenticationGuard } from "src/auth/guards/auth.guards";
import { Message } from "src/entities/message.entity";
import { MessageListParam } from "src/interfaces/message.interface";
import { MessageEntity } from "src/serializers/message.serializer";
import { MessagesService } from "./mesages.service";

@UseGuards(AuthenticationGuard)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messageService: MessagesService) {}

  @Get('/')
  async index(@Query() query: MessageListParam) {
    return this.messageService.findAllPaginate(
      query.conversation_id,
      query.take,
      query.page,
    );
  }

  @Get('/:id')
  async getById(@Param() params): Promise<MessageEntity> {
    const message = await this.messageService.findById(params.id);
    this.throwMessageNotFound(message);
    return message;
  }

  @Post('/')
  async create(@Body() inputs: Message): Promise<MessageEntity> {
    return await this.messageService.create(inputs);
  }

  @Put('/:id')
  async update(
    @Param() params,
    @Body() inputs: Message,
  ): Promise<MessageEntity> {
    const message = await this.messageService.findById(parseInt(params.id, 0));
    this.throwMessageNotFound(message);
    return await this.messageService.update(message, inputs);
  }

  @Delete('/:id')
  async delete(@Param() params): Promise<boolean> {
    const message = await this.messageService.findById(parseInt(params.id, 0));
    this.throwMessageNotFound(message);
    return await this.messageService.deleteById(params.id);
  }

  throwMessageNotFound(message: MessageEntity) {
    if (!message) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}