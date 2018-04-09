import { GraphQLInt, GapiObjectType, Resolve, GraphQLScalarType, GraphQLString, InjectType } from '@gapi/core';
import { UserSettings } from './user.settings';

@GapiObjectType()
export class UserType {
    readonly id: number | GraphQLScalarType = GraphQLInt;
    readonly email: string | GraphQLScalarType = GraphQLString;
    readonly type: string | GraphQLScalarType =  GraphQLString;
    readonly password: string | GraphQLScalarType =  GraphQLString;
    readonly name: string | GraphQLScalarType =  GraphQLString;
    readonly settings: UserSettings = InjectType(UserSettings);

    @Resolve('id')
    getId?(root, payload, context) {
        return 1;
    }
}