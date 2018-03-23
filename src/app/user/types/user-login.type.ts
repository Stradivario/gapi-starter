import { GapiObjectType, GraphQLScalarType, GraphQLString } from '@gapi/core';
import { UserType, UserObjectType } from './user.type';

@GapiObjectType()
export class UserTokenType {
    readonly token: string | GraphQLScalarType = GraphQLString;
    readonly user: UserType = UserObjectType;
}

export const UserTokenObjectType = new UserTokenType();