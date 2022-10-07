import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from './users.service';
import { UserController } from './users.controller';

@Module({
  controllers: [UserController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
