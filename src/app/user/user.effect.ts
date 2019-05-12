import { Effect } from '@rxdi/core';
import { PubSubService } from '@rxdi/graphql-pubsub';
import { OfType } from '@rxdi/graphql';
import { EffectTypes } from '../core/api-introspection/EffectTypes';
import { UserInfo } from '../core/services/auth/auth.service';
import { IUserType } from '../core/api-introspection';

@Effect()
export class UserEffect {
  constructor(private pubSub: PubSubService) {}

  @OfType<EffectTypes>(EffectTypes.findUser)
  findUser(result: IUserType, { id }, context: { user: UserInfo }) {
    this.pubSub.publish('CREATE_SIGNAL_BASIC', 'hello World');
    console.log(result, id, context);
  }
}
