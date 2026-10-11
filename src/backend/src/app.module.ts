import { Module } from '@nestjs/common';

import { PlantsModule } from './plants/plants.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Plant } from './plants/plants.entity.js'

@Module({
  imports: [
    PlantsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'plant_db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'plant',
      entities: [Plant],
      synchronize: true,
    }),
    
  ],
  // controllers: [PlantsController],
  // providers: [PlantService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

