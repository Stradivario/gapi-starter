import { GapiObjectType, Resolve, Injector, GraphQLScalarType, GraphQLBoolean } from '@gapi/core';
import { AnotherService } from '../services/another.service';


@GapiObjectType()
export class UserSettings {

    @Injector(AnotherService) private anotherService?: AnotherService;

    readonly sidebar: boolean | GraphQLScalarType = GraphQLBoolean;

    @Resolve('sidebar')
    async getSidebar?(root, payload, context) {
        return await this.anotherService.returnTrueAsync();
    }

}