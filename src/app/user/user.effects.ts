import { OfType, Service } from '@gapi/core';
import { EffectTypes } from '../core/api-introspection/EffectTypes';

@Service()
export class UserEffects {

    @OfType<EffectTypes>(EffectTypes.login)
    findUser(result, payload, context) {
        console.log(result, payload, context);
    }

}