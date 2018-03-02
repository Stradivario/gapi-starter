import { Query, GraphQLNonNull, Scope, Type, GraphQLObjectType, Mutation, GapiController, Service } from "gapi";
import { UserService } from './services/user.service';
import { UserType } from './types/user.type';

@GapiController()
export class UserSubscriptionsController {

    constructor(
        private userService: UserService
    ) {}

    // Todo Subscriptions decorators
    subscribeToUserUpdates() {
        return UserService.subscribeToUserUpdates();
    }

}
