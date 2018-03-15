// tslint:disable
// graphql typescript definitions


  export interface IGraphQLResponseRoot {
    data?: IQuery | IMutation | ISubscription;
    errors?: Array<IGraphQLResponseError>;
  }

  export interface IGraphQLResponseError {
    message: string;            // Required for all errors
    locations?: Array<IGraphQLResponseErrorLocation>;
    [propName: string]: any;    // 7.2.2 says 'GraphQL servers may provide additional entries to error'
  }

  export interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  /**
    description: Query type for all get requests which will not change persistent data
  */
  export interface IQuery {
    __typename: "Query";
    findUser: IUserType | null;
}

  
  export interface IUserType {
    __typename: "UserType";
    id: number | null;
    settings: IUserSettings | null;
}

  
  export interface IUserSettings {
    __typename: "UserSettings";
    username: string | null;
    firstname: string | null;
}

  /**
    description: Mutation type for all requests which will change persistent data
  */
  export interface IMutation {
    __typename: "Mutation";
    publishSignal: IUserMessage | null;
    deleteUser: IUserType | null;
    updateUser: IUserType | null;
    addUser: IUserType | null;
}

  
  export interface IUserMessage {
    __typename: "UserMessage";
    message: string | null;
}

  /**
    description: Subscription type for all rabbitmq subscriptions via pub sub
  */
  export interface ISubscription {
    __typename: "Subscription";
    subscribeToUserMessagesBasic: IUserMessage | null;
    subscribeToUserMessagesWithFilter: IUserMessage | null;
}


// tslint:enable
