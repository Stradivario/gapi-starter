import { Injector } from '@rxdi/core';
import { ObjectType, Resolve } from '@rxdi/graphql';
import { AnotherService } from '../services/another.service';
import { GraphQLScalarType, GraphQLBoolean } from 'graphql';

@ObjectType()
export class UserSettings {

    @Injector(AnotherService) private anotherService?: AnotherService;

    readonly sidebar: boolean | GraphQLScalarType = GraphQLBoolean;

    @Resolve('sidebar')
    async getSidebar?(root, payload, context) {
        return await this.anotherService.returnTrueAsync();
    }

}