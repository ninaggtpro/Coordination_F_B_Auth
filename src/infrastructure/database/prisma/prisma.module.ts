import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/Prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
