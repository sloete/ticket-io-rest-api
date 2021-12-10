import { Module } from '@nestjs/common';
import { TicketsModule } from './tickets/tickets.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [TicketsModule, EventsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
