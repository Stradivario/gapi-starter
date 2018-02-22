import { GraphQLString, GraphQLObjectType } from "graphql";

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