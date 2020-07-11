import { Controller } from '@rxdi/core';
import { UserService } from './services/user.service';
import { UserType } from './types/user.type';
import { UserMessage } from './types/user-message.type';
import { IUserType, IUserMessage } from '../core/api-introspection';
import { PubSubService } from '@rxdi/graphql-pubsub';
import { Scope, Type, Mutation, Public } from '@rxdi/graphql';
import { GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql';

@Controller()
export class UserMutationsController {
  constructor(
    private userService: UserService,
    private pubsub: PubSubService
  ) {}

  @Scope('ADMIN')
  @Type(UserMessage)
  @Public()
  @Mutation({
    message: {
      type: new GraphQLNonNull(GraphQLString)
    },
    signal: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
  publishSignal(root, { message, signal }, context): IUserMessage {
    console.log(
      `${signal} Signal Published message: ${message} by ${context.user.email}`
    );
    this.pubsub.publish(
      signal,
      `${signal} Signal Published message: ${message} by ${context.user.email}`
    );
    return { message };
  }

  @Scope('ADMIN')
  @Type(UserType)
  @Mutation({
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  })
  deleteUser(root, { id }, context): IUserType {
    return this.userService.deleteUser(id);
  }

  @Scope('ADMIN')
  @Type(UserType)
  @Mutation({
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  })
  updateUser(root, { id }, context): IUserType {
    return this.userService.updateUser(id);
  }

  @Scope('ADMIN')
  @Type(UserType)
  @Mutation({
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  })
  addUser(root, { id }, context): IUserType {
    return this.userService.addUser(id);
  }
}
