import { Module } from '@nestjs/common';

import { PlantsModule } from './plants/plants.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Plant } from './plants/plants.entity.js'
import { SpeciesModule } from './species/species.module.js';
import { Specie } from './species/species.entity.js';

@Module({
  imports: [
    PlantsModule,
    SpeciesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'plant_db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'plant',
      entities: [Plant, Specie],
      synchronize: true,
    }),
    
  ],
  // controllers: [PlantsController],
  // providers: [PlantService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

