import { Controller, Get, Param, Post, Body, Patch, Delete, HttpCode, ParseUUIDPipe } from '@nestjs/common';
import { PlantService } from './plants.service.js';
import * as ReqPlantDto from './dto/request-plant-dto.js';
import * as ResPlantDto from './dto/response-plant-dto.js';

@Controller('plants')
export class PlantsController {
    constructor(
        private plantService: PlantService
    ){}

    @Get('/')
        async findAll(): 
            Promise<ResPlantDto.ResponseType[]> {
            const plants = await this.plantService.findAll()
            return plants.map(plant => ResPlantDto.parsed(plant))
            }

    @Get('/:id')
        async findOne(
            @Param('id', ParseUUIDPipe) id: string): 
            Promise<ResPlantDto.ResponseType>{ 
            const plant = await this.plantService.findOne(id);
            return ResPlantDto.parsed(plant)
            }

    @Post('/')
        @HttpCode(201)
            async create(
                @Body({schema:ReqPlantDto.create}) plantDto:ReqPlantDto.CreateType): 
                Promise<ResPlantDto.ResponseType> {
                const plant = await this.plantService.create(plantDto)
                return ResPlantDto.parsed(plant)
                }

    @Patch('/:id')
        async update(
            @Param('id', ParseUUIDPipe) id: string ,
            @Body({schema:ReqPlantDto.update}) plantDto:ReqPlantDto.UpdateType): 
            Promise<ResPlantDto.ResponseType>{
            const plant = await this.plantService.update(id, plantDto)
            return ResPlantDto.parsed(plant)
            }

    @Delete('/:id')
        @HttpCode(204)
            async delete(
                @Param('id', ParseUUIDPipe) id: string)
                : Promise<void> {
                return this.plantService.delete(id)
                }
}

