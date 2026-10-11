import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { PlantsController } from './plants.controller.js';
import { PlantService } from './plants.service.js';
import { LoggerMiddleware } from '../middlewares/logger-middleware.js';
// import { AuthMiddleware } from '../middlewares/auth-middleware.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plant } from './plants.entity.js';

@Module({
  imports:[TypeOrmModule.forFeature([Plant])],
  controllers: [PlantsController],
  providers: [PlantService],
})

export class PlantsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
        .apply(
            LoggerMiddleware, 
            // AuthMiddleware
        )
        .forRoutes(
            { path:'/plants/', method:RequestMethod.GET },
            { path:'/plants/:id', method:RequestMethod.PATCH}
        )
    }
}

// global middleware : app.use(logger);