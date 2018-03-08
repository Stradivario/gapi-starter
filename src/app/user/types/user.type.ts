import { GraphQLObjectType, GraphQLString, GraphQLInt, GapiObjectType, Type, Resolve, GraphQLScalarType } from "gapi";
import { UserSettings, UserSettingsObjectType } from './user.settings';

@GapiObjectType()
export class UserType {
    readonly id: number | GraphQLScalarType = GraphQLInt;
    readonly settings: string | UserSettings = UserSettingsObjectType;
    
    @Resolve('id')
    getId?(root, payload, context) {
        return 1;
    }
}

export const UserObjectType = new UserType();