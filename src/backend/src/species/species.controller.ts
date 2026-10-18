import { Controller, Get, Param, Post, Body, Patch, Delete, HttpCode, ParseUUIDPipe } from '@nestjs/common';
import { SpecieService } from './species.service.js';
import * as ReqSpecieDto from './dto/request-species-dto.js'
import * as ResSpecieDto from './dto/response-species-dto.js'

@Controller('species')
export class SpecieController {
    constructor( private specieService: SpecieService ){}

    @Get('/')
        async findAll():
            Promise<ResSpecieDto.ResponseType[]> {
                const species = await this.specieService.findAll()
                return species.map(ResSpecieDto.parsed)
                }
    
    @Get('/:id')
        async findByOne(
            @Param('id', ParseUUIDPipe) id: string):
            Promise<ResSpecieDto.ResponseType> {
                const specie = await this.specieService.findOne(id)
                return ResSpecieDto.parsed(specie)
                }
    
    @Post('/')
        @HttpCode(201)
            async create(
                @Body({schema:ReqSpecieDto.create}) specieDto: ReqSpecieDto.CreateType):
                Promise<ResSpecieDto.ResponseType> {
                    const specie = await this.specieService.create(specieDto);
                    return ResSpecieDto.parsed(specie)
                }

    @Patch('/:id')
        async update(
            @Param('id', ParseUUIDPipe) id: string,
            @Body({schema:ReqSpecieDto.update}) ReqSpecieDto: ReqSpecieDto.UpdateType ):
            Promise<ResSpecieDto.ResponseType>{
                const specie = await this.specieService.update(id, ReqSpecieDto)
                return ResSpecieDto.parsed(specie)
            }


    @Delete('/:id')
        @HttpCode(204)
            async delete(
                @Param('id', ParseUUIDPipe) id:string):
                Promise<void> {
                return this.specieService.delete(id)
                }  
}