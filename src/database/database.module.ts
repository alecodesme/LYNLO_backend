import { Module } from '@nestjs/common';
import { DatabaseHealthService } from './database-health.service';

@Module({
  providers: [DatabaseHealthService],
})
export class DatabaseModule {}