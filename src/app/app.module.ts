
import { GapiModule, GapiServerModule, Service, SchemaService, Container, GraphQLObjectType, ControllerContainerService } from 'gapi';
import { CoffeMachineModule } from './coffe-machine/coffe-machine.module';
import { UserModule } from './user/user.module';
import { readFileSync } from 'fs';
import { UserController } from './user/user.controller';
import { TicketModule } from './Ticket/ticket.module';

import { TicketQuery } from './Ticket/index';
const test = Container.get(ControllerContainerService);
const ticketCtrl = test.getController('TicketController');

let QueryFields = {};
Array.from(ticketCtrl._queries.keys()).forEach(key => QueryFields[key] = ticketCtrl.getQuery(key));
console.log('MY', QueryFields);
console.log('THEIRS', TicketQuery);

export const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'Query type for all get requests which will not change persistent data',
    fields: {
          ...QueryFields,
    }
});

export const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Mutation type for all requests which will change persistent data',
    fields: {
        //   ...UserMutation,
    }
});

export const Subscription = new GraphQLObjectType({
    name: 'Subscription',
    description: 'Subscription type for all rabbitmq subscriptions via pub sub',
    fields: {
        //   ...SignalSubscription,
    }
});

const schemaService: SchemaService = Container.get(SchemaService);
const schema = schemaService.generateSchema(Query);

@GapiModule({
    imports: [
        GapiServerModule.forRoot({
            port: '5052',
            cert: readFileSync('./cert.key'),
            schema: schema,
        }),
        TicketModule,
        CoffeMachineModule,
        UserModule
    ]
})
export class AppModule { }
