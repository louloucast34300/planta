import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { LoggerMiddleware } from '../middlewares/logger-middleware.js'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Specie } from './species.entity.js'
import { SpecieController } from './species.controller.js'
import { SpecieService } from './species.service.js'


@Module({
    imports:[TypeOrmModule.forFeature([Specie])],
    controllers:[SpecieController],
    providers: [SpecieService],
    exports: [SpecieService]
})

export class SpeciesModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes({ path:'/species/', method:RequestMethod.GET})
    }
}