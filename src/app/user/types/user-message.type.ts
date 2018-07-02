import { GapiObjectType } from '@rxdi/graphql';
import { GraphQLScalarType, GraphQLString } from 'graphql';

@GapiObjectType()
export class UserMessage {
    readonly message: string | GraphQLScalarType = GraphQLString;
}