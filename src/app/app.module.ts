
import { GapiModule, GapiServerModule, Service, SchemaService, Container, GraphQLObjectType, ControllerContainerService } from 'gapi';
import { CoffeMachineModule } from './coffe-machine/coffe-machine.module';
import { UserModule } from './user/user.module';
import { readFileSync } from 'fs';
import { UserController } from './user/user.controller';
import { TicketModule } from './Ticket/ticket.module';
import { TicketQuery } from './Ticket/index';

@GapiModule({
    imports: [
        GapiServerModule.forRoot(<any>{
            port: '5052',
            cert: readFileSync('./cert.key')
        }),
        TicketModule,
        CoffeMachineModule,
        UserModule
    ]
})
export class AppModule { }
