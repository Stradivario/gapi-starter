import { Controller } from '@rxdi/core';
import { Type, Scope, Public } from '@rxdi/graphql';
import { withFilter } from 'graphql-subscriptions';
import { GraphQLNonNull, GraphQLInt } from 'graphql';
import { PubSubService, Subscribe, Subscription } from '@rxdi/graphql-pubsub';
import { UserMessage } from './types/user-message.type';
import { IUserMessage } from '../core/api-introspection';

@Controller()
export class UserSubscriptionsController {
  constructor(private pubsub: PubSubService) {}

  @Scope('ADMIN')
  @Type(UserMessage)
  @Public()
  @Subscribe((self: UserSubscriptionsController) =>
    self.pubsub.asyncIterator('CREATE_SIGNAL_BASIC')
  )
  @Subscription()
  subscribeToUserMessagesBasic(message): IUserMessage {
    return { message };
  }

  @Scope('ADMIN')
  @Type(UserMessage)
  @Subscribe(
    withFilter(
      (self: UserSubscriptionsController) =>
        self.pubsub.asyncIterator('CREATE_SIGNAL_WITH_FILTER'),
      (payload, { id }, context) => {
        console.log('Subscribed User: ', id, JSON.stringify(context.user));
        return true;
      }
    )
  )
  @Subscription({
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  })
  subscribeToUserMessagesWithFilter(message): IUserMessage {
    return { message };
  }
}
