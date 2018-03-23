import { GraphQLInt, GapiObjectType, Resolve, GraphQLScalarType, GraphQLString } from '@gapi/core';
import { UserSettings, UserSettingsObjectType } from './user.settings';

@GapiObjectType()
export class UserType {
    readonly id: number | GraphQLScalarType = GraphQLInt;
    readonly email: string | GraphQLScalarType = GraphQLString;
    readonly type: string | GraphQLScalarType =  GraphQLString;
    readonly password: string | GraphQLScalarType =  GraphQLString;
    readonly name: string | GraphQLScalarType =  GraphQLString;
    readonly settings: string | UserSettings = UserSettingsObjectType;

    @Resolve('id')
    getId?(root, payload, context) {
        return 1;
    }
}

export const UserObjectType = new UserType();