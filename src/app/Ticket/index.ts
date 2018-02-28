import {TicketController} from './ticket.controller';
import { Container } from 'gapi';

const ticketController: TicketController = Container.get(TicketController);
export const TicketMutation = {
  destroyTicket: ticketController.destroyTicket(),
  updateTicket: ticketController.updateTicket()
};

export const TicketQuery = {
  listTickets: ticketController.listTickets(),
  findTicket: ticketController.findTicket(),
};
