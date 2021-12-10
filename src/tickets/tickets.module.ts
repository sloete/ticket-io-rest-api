import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { EventsModule } from '../events/events.module';

@Module({
  controllers: [TicketsController],
  providers: [TicketsService],
  imports: [EventsModule],
})
export class TicketsModule {}
