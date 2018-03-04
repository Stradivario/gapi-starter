import { Query, GraphQLNonNull, Scope, Type, GraphQLObjectType, Mutation, GapiController, Service, Container } from "gapi";
import { UserService } from './services/user.service';
import { UserType } from './types/user.type';

@GapiController()
export class UserSubscriptionsController {

    private userService: UserService = Container.get(UserService);

    subscribeToUserUpdates() {
        return this.userService.subscribeToUserUpdates();
    }

}
