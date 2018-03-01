import { TicketType } from './ticket.type';
import { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLInputObjectType, GraphQLInt, GraphQLList, GapiController, Type, Query, Scope, Service, Mutation, GapiModule } from 'gapi';


@GapiController({
  scope: ['ADMIN']
})
export class TicketController {

  @Scope('ADMIN')
  @Type(TicketType)
  @Mutation({
    message: {
      type: new GraphQLNonNull(GraphQLString)
    },
    productId: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    userId: {
      type: new GraphQLNonNull(GraphQLInt)
    },
  })
  createTicket() {
    return {id: 1};
  }

  @Scope('ADMIN')
  @Type(TicketType)
  @Query({
    message: {
      type: new GraphQLNonNull(GraphQLString)
    },
    productId: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    userId: {
      type: new GraphQLNonNull(GraphQLInt)
    },
  })
  createTicket2() {
    return {id: 1};
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


  // @Scope('ADMIN')
  // @Type(new GraphQLList(TicketType))
  // @Query()
  // listTickets(root, id, context) {
  //   return Promise.resolve([{id: 1}]);
  // }
  
  findTicket() {
    return {
      type: TicketType,
      scope: ['ADMIN'],
      resolve: (root, { id }) => 1
    };
  }

}


