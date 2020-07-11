import { GraphQLInt, GraphQLString, GraphQLObjectType } from 'graphql';
import { UserSettings } from './user.settings';

export const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: () => 1
    },
    email: {
      type: GraphQLString
    },
    type: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    settings: {
      type: UserSettings
    }
  })
});
