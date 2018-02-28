import { GraphQLString, GraphQLObjectType } from "gapi";

export const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: {
        id: {
            type: GraphQLString
        },
        friendId: {
            type: GraphQLString
        },
    }
});