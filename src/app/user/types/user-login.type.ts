import { GapiObjectType, InjectType } from '@rxdi/graphql';
import { UserType } from './user.type';
import { GraphQLScalarType, GraphQLString } from 'graphql';

@GapiObjectType()
export class UserTokenType {
    readonly token: string | GraphQLScalarType = GraphQLString;
    readonly user: UserType = InjectType(UserType);
}