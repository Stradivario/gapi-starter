import { GraphQLNonNull, Scope, Type, Mutation, GapiController, GraphQLInt, GapiPubSubService, GraphQLString } from '@gapi/core';
import { UserService } from './services/user.service';
import { UserObjectType } from './types/user.type';
import { UserMessage, UserMessageType } from './types/user-message.type';
import { IUserType } from '../core/api-introspection';

@GapiController()
export class UserMutationsController {

    constructor(
        private userService: UserService,
        private pubsub: GapiPubSubService
    ) {}

    @Scope('ADMIN')
    @Type(UserMessageType)
    @Mutation({
        message: {
            type: new GraphQLNonNull(GraphQLString)
        },
        signal: {
            type: new GraphQLNonNull(GraphQLString)
        },
    })
    publishSignal(root, { message, signal }, context): UserMessage  {
        console.log(`${signal} Signal Published message: ${message} by ${context.email}`);
        this.pubsub.publish(signal, `${signal} Signal Published message: ${message} by ${context.email}`);
        return {message};
    }

    @Scope('ADMIN')
    @Type(UserObjectType)
    @Mutation({
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    })
    deleteUser(root, { id }, context): IUserType  {
        return this.userService.deleteUser(id);
    }

    @Scope('ADMIN')
    @Type(UserObjectType)
    @Mutation({
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    })
    updateUser(root, { id }, context): IUserType {
        return this.userService.updateUser(id);
    }

    @Scope('ADMIN')
    @Type(UserObjectType)
    @Mutation({
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    })
    addUser(root, { id }, context): IUserType  {
        return this.userService.addUser(id);
    }


}
