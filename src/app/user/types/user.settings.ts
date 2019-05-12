import { Container } from '@rxdi/core';
import { AnotherService } from '../services/another.service';
import { GraphQLBoolean, GraphQLObjectType } from 'graphql';

export const UserSettings = new GraphQLObjectType({
  name: 'UserSettings',
  fields: () => ({
    sidebar: {
      type: GraphQLBoolean,
      resolve: async () => await Container.get(AnotherService).returnTrueAsync()
    }
  })
});
