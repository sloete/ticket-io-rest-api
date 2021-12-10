import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketsService {
  private tickets: Ticket[] = [];

  create(createTicketDto: CreateTicketDto) {
    const newTicket = new Ticket(
      createTicketDto.eventId,
      createTicketDto.barcode,
      createTicketDto.firstName,
      createTicketDto.lastName,
    );
    this.tickets.push(newTicket);

    return newTicket;
  }

  findAll() {
    return [...this.tickets];
  }

  findOne(id: string) {
    return { ...this.findTicketByIdOrFail(id) };
  }

  update(id: string, updateTicketDto: UpdateTicketDto) {
    const ticket = this.findTicketByIdOrFail(id);

    for (const key in updateTicketDto) {
      if (updateTicketDto[key]) {
        ticket[key] = updateTicketDto[key];
      }
    }

    return { ...ticket };
  }

  remove(id: string) {
    this.findTicketByIdOrFail(id);

    this.tickets = this.tickets.filter((ticket) => ticket.id !== id);
  }

  private findTicketByIdOrFail(id: string): Ticket {
    const ticket = this.tickets.find((ticket) => ticket.id === id);

    if (!ticket) {
      throw new NotFoundException(`Ticket ${id} not found.`);
    }

    return ticket;
  }
}
