import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InformationRepository } from "src/repositories/information.repository";
import { InformationEntity } from "src/serializers/information.serializer";
import { SaveInformationDto } from "./dto/save.dto";

@Injectable()
export class InformationService {
  constructor(
    @InjectRepository(InformationRepository)
    private informationRepository: InformationRepository,
  ) {}

  async findAll(
    relations: string[] = [],
    throwsException = false,
  ): Promise<InformationEntity[]> {
    return await this.informationRepository.getAllEntity(
      relations,
      throwsException,
    );
  }

  async create(inputs: SaveInformationDto): Promise<InformationEntity> {
    return await this.informationRepository.createEntity(inputs);
  }

  async findById(
    id: number,
    relations: string[] = [],
    throwsException = false,
  ): Promise<InformationEntity> {
    return await this.informationRepository.getEntityById(
      id,
      relations,
      throwsException,
    );
  }

  async findSocketId(user_id: number[]) {
    return await this.informationRepository.findSocketId(user_id);
  }

  async update(
    Information: InformationEntity,
    inputs: SaveInformationDto,
  ): Promise<InformationEntity> {
    return await this.informationRepository.updateEntity(Information, inputs);
  }

  async deleteById(id: number): Promise<boolean> {
    return await this.informationRepository.deleteEntityById(id);
  }

  async deleteByValue(user_id: number, value: string): Promise<boolean> {
    return await this.informationRepository.deleteByValue(user_id, value);
  }
}