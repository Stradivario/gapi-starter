import { Query, GraphQLNonNull, Scope, Type, GraphQLObjectType, Mutation, GapiController, Service, GraphQLInt, Container, Injector, GapiPubSubService, GraphQLString } from "gapi";
import { UserService } from './services/user.service';
import { UserObjectType, UserType } from './types/user.type';
import { UserMessage, UserMessageType } from "./types/user-message.type";

@GapiController()
export class UserMutationsController {

    @Injector(UserService) private userService: UserService;
    @Injector(GapiPubSubService) private pubsub: GapiPubSubService;


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
    deleteUser(root, { id }, context): UserType  {
        return this.userService.deleteUser(id);
    }

    @Scope('ADMIN')
    @Type(UserObjectType)
    @Mutation({
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    })
    updateUser(root, { id }, context): UserType {
        return this.userService.updateUser(id);
    }

    @Scope('ADMIN')
    @Type(UserObjectType)
    @Mutation({
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    })
    addUser(root, { id }, context): UserType  {
        return this.userService.addUser(id);
    }


}
