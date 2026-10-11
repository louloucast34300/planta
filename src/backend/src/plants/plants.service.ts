import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plant } from './plants.entity.js';
import * as ReqPlantDto from './dto/request-plant-dto.js';


@Injectable()
export class PlantService {

  constructor(
    @InjectRepository(Plant)
    private plantRepository: Repository<Plant>
  ){}

  async findAll(): Promise<Plant[]> {
    return await this.plantRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<Plant> {
    const plant = await this.plantRepository.findOneBy({ id });
    if(!plant) throw new NotFoundException(`Plante ${id} introuvable.`)
    return plant
  }

  async create(plant:ReqPlantDto.CreateType):Promise<Plant> {
    const newPlant = this.plantRepository.create(plant)
    return await this.plantRepository.save(newPlant)
  }

  async update(id: string, plant:ReqPlantDto.UpdateType): Promise<Plant> {
    const updated = await this.plantRepository.preload({id, ...plant})
    if(!updated) throw new NotFoundException(`Plante ${id} introuvable.`)
    return await this.plantRepository.save(updated)
  }

  async delete(id: string): Promise<void>{
    const plant = await this.plantRepository.findOneBy({id})
    if(!plant) throw new NotFoundException(`Plante ${id} introuvable.`)
    await this.plantRepository.remove(plant)
  }
}
