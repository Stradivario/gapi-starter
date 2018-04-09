import { OfType, GapiEffect, GapiPubSubService } from '@gapi/core';
import { EffectTypes } from '../core/api-introspection/EffectTypes';
import { UserType } from './types/user.type';
import { UserInfo } from '../core/services/auth/auth.service';

@GapiEffect()
export class UserEffect {

    constructor(
        private pubSub: GapiPubSubService
    ) {}

    @OfType<EffectTypes>(EffectTypes.findUser)
    findUser(result: UserType, { id }, context: UserInfo) {
        this.pubSub.publish('CREATE_SIGNAL_BASIC', {hello: 'World!'});
        console.log(result, id, context);
    }

}