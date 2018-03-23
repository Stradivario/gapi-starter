import { GapiObjectType, GraphQLScalarType, GraphQLString } from '@gapi/core';

@GapiObjectType()
export class UserMessage {
    readonly message: string | GraphQLScalarType = GraphQLString;
}

export const UserMessageType = new UserMessage();