import { GraphQLObjectType, GraphQLString, GraphQLInt } from "gapi";

export const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: {
        id: {
            type: GraphQLInt
        },
    }
});