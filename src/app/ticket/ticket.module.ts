import { GapiModule } from "gapi";
import { TicketController } from "./ticket.controller";

@GapiModule({
    controllers: [
        TicketController
    ]
})
export class TicketModule {}