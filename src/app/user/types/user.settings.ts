import { GapiObjectType, Resolve, Injector, GraphQLScalarType, GraphQLBoolean } from '@gapi/core';
import { AnotherService } from '../services/another.service';


@GapiObjectType()
export class UserSettings {

    @Injector(AnotherService) private anotherService?: AnotherService;

    readonly sidebar: string | GraphQLScalarType = GraphQLBoolean;

    @Resolve('sidebar')
    async getUsername?(root, payload, context) {
        return await this.anotherService.returnTrueAsync();
    }

}

export const UserSettingsObjectType = new UserSettings();