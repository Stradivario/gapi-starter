import { GraphQLObjectType, GraphQLString, GraphQLInt, GapiObjectType } from "gapi";
import { GraphQLScalarType } from "graphql";

export const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: {
        id: {
            type: GraphQLInt
        },
        username: {
            type: GraphQLString
        }
    }
});

// Experimental no nested values
@GapiObjectType()
export class UserType2 {
    id: GraphQLScalarType = GraphQLInt;
    username: GraphQLScalarType = GraphQLString;
}

export const UserObjectType = new UserType2();