import {GraphQLString, GraphQLObjectType, GraphQLInt} from 'gapi';

export const TicketType = new GraphQLObjectType({
  name: 'TicketType',
  fields: {
    id: {
      type: GraphQLString
    },
    message: {
      type: GraphQLString
    },
    productId: {
      type: GraphQLInt
    },
    userId: {
      type: GraphQLInt
    }
  }
});

