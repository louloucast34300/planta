import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Specie } from './species.entity.js'
import * as ReqSpecieDto from './dto/request-species-dto.js'

@Injectable()
export class SpecieService {
    constructor(
        @InjectRepository(Specie)
        private specieRepository: Repository<Specie>
    ){}

    async findAll(): Promise<Specie[]> {
        return await this.specieRepository.find({ order: { createdAt: 'DESC'}});
    } 

    async findOne(id: string): Promise<Specie> {
        const specie = await this.specieRepository.findOneBy({ id });
        if(!specie) throw new NotFoundException(`Espèce ${id} introuvable.`)
        return specie 
    }

    async create(specie:ReqSpecieDto.CreateType):Promise<Specie> {
        const newSpecie = this.specieRepository.create(specie)
        return await this.specieRepository.save(newSpecie)
    }

    async update(id: string, specie:ReqSpecieDto.UpdateType): Promise<Specie> {
        const updated = await this.specieRepository.preload({ id, ...specie })
        if(!updated) throw new NotFoundException(`Espèce ${id} introuvable`)
        return await this.specieRepository.save(updated)
    }

    async delete(id: string): Promise<void> {
        const specie = await this.specieRepository.findOneBy({ id })
        if(!specie) throw new NotFoundException(`Espèce ${id} introuvable`)
        await this.specieRepository.remove(specie)
    }
}