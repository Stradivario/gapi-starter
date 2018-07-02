import { ObjectType } from '@rxdi/graphql';
import { GraphQLScalarType, GraphQLString } from 'graphql';

@ObjectType()
export class UserMessage {
    readonly message: string | GraphQLScalarType = GraphQLString;
}