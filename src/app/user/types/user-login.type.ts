import { UserType } from './user.type';
import { GraphQLString, GraphQLObjectType } from 'graphql';

export const UserTokenType = new GraphQLObjectType({
  name: 'UserTokenType',
  fields: () => ({
    token: {
      type: GraphQLString
    },
    user: {
      type: UserType
    }
  })
});
