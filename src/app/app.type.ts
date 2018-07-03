import { GraphQLScalarType, GapiObjectType, GraphQLInt} from "@gapi/core";

@GapiObjectType()
export class AppType {
    readonly id: number | GraphQLScalarType = GraphQLInt;
}