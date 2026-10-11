import { Controller, Get, Param, Post, Body, Patch, Delete, HttpCode, ParseUUIDPipe } from '@nestjs/common';
import { PlantService } from './plants.service.js';
import { type CreatePlantDto, createPlantSchema } from './dto/create-plant-dto.js';
import { type UpdatePlantDto, updatePlantSchema } from './dto/update-plant-dto.js';
import { type ResponsePlantDto, toPlantResponse } from './dto/response-plant-dto.js';

@Controller('plants')
export class PlantsController {
    constructor(private plantService: PlantService){}

    @Get('/')
        async findAll()
        : Promise<ResponsePlantDto[]> {
            const plants = await this.plantService.findAll()
            return plants.map(toPlantResponse);
        }

    @Get('/:id')
        async findOne(
            @Param('id', ParseUUIDPipe) id: string)
            : Promise<ResponsePlantDto>{
            const plant = await this.plantService.findOne(id);
            return toPlantResponse(plant)
        }

    @Post('/')
        @HttpCode(201)
            async create(
                @Body({schema:createPlantSchema}) plantDto:CreatePlantDto)
                : Promise<ResponsePlantDto>{
                const plant = await this.plantService.create(plantDto)
                return toPlantResponse(plant)
            }

    @Patch('/:id')
        async update(
            @Param('id', ParseUUIDPipe) id: string ,
            @Body({schema:updatePlantSchema}) plantDto:UpdatePlantDto)
            : Promise<ResponsePlantDto>{
            const plant = await this.plantService.update(id, plantDto)
            return toPlantResponse(plant)
        }

    @Delete('/:id')
        @HttpCode(204)
            async delete(
                @Param('id', ParseUUIDPipe) id: string)
                : Promise<void> {
                return this.plantService.delete(id)
            }
}

