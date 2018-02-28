import { TicketType } from './ticket.type';
import { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLInputObjectType, GraphQLInt, GraphQLList, GapiController, Type, Query, Scope } from 'gapi';

@GapiController({
  type: TicketType,
  scope: ['ADMIN', 'USER']
})
export class TicketController {

  constructor() {
    setTimeout(() => {
      console.log(this);
    }, 5000)
  }
  createTicket() {
    return {
      public: true,
      type: TicketType,
      args: {
        message: {
          type: new GraphQLNonNull(GraphQLString)
        },
        productId: {
          type: new GraphQLNonNull(GraphQLInt)
        },
        userId: {
          type: new GraphQLNonNull(GraphQLInt)
        },
      },
      resolve: (root, { message, productId, userId }) => 1
    };
  }

  destroyTicket() {
    return {
      type: TicketType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: (root, { id }) => 1
    };
  }

  updateTicket() {
    return {
      type: TicketType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        },
        payload: {
          type: new GraphQLInputObjectType({
            name: 'TicketUpdatePayloadType',
            fields: {
              name: {
                type: GraphQLString
              },
            }
          })
        }
      },
      resolve: (root, { id, payload }) => 1
    };
  }

  @Type(new GraphQLList(TicketType))
  @Scope('ADMIN')
  @Query()
  listTickets(root, id, context) {
    return Promise.resolve([{id: 1}]);
  }
  
  findTicket() {
    return {
      type: TicketType,
      scope: ['ADMIN'],
      resolve: (root, { id }) => 1
    };
  }

}


