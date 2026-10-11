import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';


@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    // const user = await this.authService.verify(req.headers.authorization);
    if(!req.headers.authorization){
     throw new UnauthorizedException();   
    }
    console.log('Auth...');
    next();
  }
}