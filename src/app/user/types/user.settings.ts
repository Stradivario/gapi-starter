import { GraphQLObjectType, GraphQLString, GraphQLInt, GapiObjectType, Type, Resolve } from "gapi";
import { GraphQLScalarType } from "graphql";


@GapiObjectType()
export class UserSettings {
    readonly username: string | GraphQLScalarType = GraphQLString;
    readonly firstname: string | GraphQLScalarType = GraphQLString;

    @Resolve('username')
    getUsername?(root, payload, context) {
        return 'username-changed';
    }

    @Resolve('firstname')
    getFirstname?(root, payload, context) {
        return 'firstname-changed';
    }

}

export const UserSettingsObjectType = new UserSettings();