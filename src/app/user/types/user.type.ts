import { InjectType } from '@gapi/core';
import { GapiObjectType, Resolve } from '@rxdi/graphql';
import { GraphQLScalarType, GraphQLInt, GraphQLString } from 'graphql';
import { UserSettings } from './user.settings';

@GapiObjectType()
export class UserType {
    readonly id: number | GraphQLScalarType = GraphQLInt;
    email: string | GraphQLScalarType = GraphQLString;
    type: string | GraphQLScalarType =  GraphQLString;
    password: string | GraphQLScalarType =  GraphQLString;
    name: string | GraphQLScalarType =  GraphQLString;
    settings: UserSettings = InjectType(UserSettings);

    @Resolve('id')
    getId?(root, payload, context) {
        return 1;
    }
}