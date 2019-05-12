import { GraphQLString, GraphQLObjectType } from 'graphql';

export const UserMessage = new GraphQLObjectType({
  name: 'UserMessage',
  fields: () => ({
    message: {
      type: GraphQLString
    }
  })
});
