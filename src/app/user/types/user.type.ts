import { GraphQLObjectType, GraphQLString, GraphQLInt, GapiObjectType, Type, Resolve } from "gapi";
import { GraphQLScalarType } from "graphql";

@GapiObjectType()
export class UserSettings {
    username: string | GraphQLScalarType = GraphQLString;
    firstname: string | GraphQLScalarType = GraphQLString;

    @Resolve('username')
    getUsername?(root, payload, context) {
        return 'username-changed';
    }
}

@GapiObjectType()
export class UserType {
    id: number | GraphQLScalarType = GraphQLInt;
    settings: string | UserSettings = new UserSettings();
    
    @Resolve('id')
    getId?(root, payload, context) {
        return 5;
    }
}

export const UserObjectType = new UserType();