import { Module } from '@nestjs/common';
import { TicketsModule } from './tickets/tickets.module';
import { EventsModule } from './events/events.module';
import { DatabaseModule } from './core/database/database.module';

@Module({
  imports: [TicketsModule, EventsModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
1;
