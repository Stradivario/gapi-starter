import { GraphQLObjectType, GraphQLString, GraphQLInt, GapiObjectType, Type, Resolve, Injector } from "gapi";
import { GraphQLScalarType } from "graphql";
import { AnotherService } from "../services/user.service";


@GapiObjectType()
export class UserSettings {

    @Injector(AnotherService) private anotherService?: AnotherService;

    readonly username: string | GraphQLScalarType = GraphQLString;
    readonly firstname: string | GraphQLScalarType = GraphQLString;

    @Resolve('username')
    async getUsername?(root, payload, context) {
        return await this.anotherService.trimFirstLetterAsync(root.username);
    }

    @Resolve('firstname')
    getFirstname?(root, payload, context) {
        return 'firstname-changed';
    }

}

export const UserSettingsObjectType = new UserSettings();