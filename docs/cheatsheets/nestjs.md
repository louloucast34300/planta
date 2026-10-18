# NestJS — Cheat Sheet

## Architecture

```
Requête → Middleware → Guard → Pipe (validation) → Controller → Service → Repository (DB)
```

- **Module** : regroupe un domaine (controller, service, entités).
- **Controller** : reçoit la requête HTTP et renvoie la réponse. Aucune logique métier.
- **Service** (provider) : contient la logique métier et l'accès aux données. Injecté dans le controller.

## CLI

```bash
nest g resource users     # module + controller + service + dto (le plus pratique)
nest g module users
nest g controller users
nest g service users
```

## Module

```ts
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersController } from './users.controller.js'
import { UsersService } from './users.service.js'
import { User } from './user.entity.js'

@Module({
  imports: [TypeOrmModule.forFeature([User])],   // autres modules / repositories utilisés
  controllers: [UsersController],
  providers: [UsersService],                     // ce qui peut être injecté dans ce module
  exports: [UsersService],                       // le rend utilisable par les modules qui importent UsersModule
})
export class UsersModule {}
```

Penser à ajouter le module dans `imports` de `AppModule`.

## Service type

```ts
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity.js'
import * as UserDto from './dto/user.dto.js'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  findAll(): Promise<User[]> {
    return this.userRepo.find({ order: { createdAt: 'DESC' } })
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepo.findOneBy({ id })
    if (!user) throw new NotFoundException(`User ${id} introuvable`)
    return user
  }

  create(dto: UserDto.CreateType): Promise<User> {
    return this.userRepo.save(this.userRepo.create(dto))
  }

  async update(id: string, dto: UserDto.UpdateType): Promise<User> {
    const user = await this.userRepo.preload({ id, ...dto })
    if (!user) throw new NotFoundException(`User ${id} introuvable`)
    return this.userRepo.save(user)
  }

  async remove(id: string): Promise<void> {
    await this.userRepo.remove(await this.findOne(id))
  }
}
```

## Controller type

```ts
import { Controller, Get, Post, Patch, Delete, Param, Body, Query, HttpCode, ParseUUIDPipe } from '@nestjs/common'
import { UsersService } from './users.service.js'
import * as UserDto from './dto/user.dto.js'

@Controller('users')                          // préfixe des routes : /users
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()                                      // GET /users?search=al
  findAll(@Query('search') search?: string) {
    return this.usersService.findAll()
  }

  @Get(':id')                                 // GET /users/:id
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id)
  }

  @Post()                                     // POST /users (201 par défaut)
  create(@Body({ schema: UserDto.create }) dto: UserDto.CreateType) {
    return this.usersService.create(dto)
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body({ schema: UserDto.update }) dto: UserDto.UpdateType) {
    return this.usersService.update(id, dto)
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id)
  }
}
```

## DTO avec Zod

```ts
import { z } from 'zod'

export const create = z.object({
  name: z.string().trim().min(1),
  email: z.email(),
})
export type CreateType = z.infer<typeof create>

export const update = create.partial()          // tous les champs optionnels
export type UpdateType = z.infer<typeof update>
```

La validation passe par `StandardSchemaValidationPipe`, déclaré globalement dans `main.ts`.

## Décorateurs

| Décorateur | Rôle |
|---|---|
| `@Module({...})` | déclare un module |
| `@Controller('path')` | déclare un controller et son préfixe de route |
| `@Injectable()` | rend une classe injectable (service, guard, middleware…) |
| `@Get()` `@Post()` `@Put()` `@Patch()` `@Delete()` | méthode HTTP + route |
| `@Param('id')` | paramètre d'URL `/users/:id` |
| `@Query('key')` | query string `?key=value` |
| `@Body()` | corps de la requête |
| `@Headers('authorization')` | un header |
| `@Req()` / `@Res()` | objets Express bruts (à éviter si possible) |
| `@HttpCode(204)` | code de statut de la réponse |
| `@UseGuards(AuthGuard)` | applique un guard (route ou controller) |
| `@InjectRepository(Entity)` | injecte un repository TypeORM |

## Pipes intégrés

```ts
@Param('id', ParseUUIDPipe) id: string
@Param('page', ParseIntPipe) page: number
@Query('active', ParseBoolPipe) active: boolean
```

## Exceptions HTTP

```ts
throw new BadRequestException('msg')     // 400
throw new UnauthorizedException()        // 401
throw new ForbiddenException()           // 403
throw new NotFoundException('msg')       // 404
throw new ConflictException('msg')       // 409
```

Nest les convertit automatiquement en réponse JSON `{ statusCode, message, error }`.

## Middleware

```ts
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req.method, req.url)
    next()
  }
}

// dans le module
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users')
  }
}
```

## Notes perso

<!-- Guards, interceptors, ConfigModule, tests… à ajouter au fil du projet -->
