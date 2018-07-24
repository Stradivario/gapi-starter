import { Module, CoreModule } from "@gapi/core";

@Module({
    imports: [
        CoreModule.forRoot({
            server: {
                hapi: {
                    port: process.env.API_PORT || process.env.PORT || 9000
                }
            },
            graphql: {
                path: '/graphql',
                graphiQlPath: '/graphiql',
                openBrowser: true,
                watcherPort: 8967,
                writeEffects: true,
                graphiql: true,
                graphiQlPlayground: false,
                graphiqlOptions: {
                    endpointURL: '/graphql',
                    passHeader: `'Authorization':'${process.env.GRAPHIQL_TOKEN}'`,
                    subscriptionsEndpoint: `${process.env.GRAPHIQL_WS_SSH ? 'wss' : 'ws'}://${process.env.GRAPHIQL_WS_PATH || 'localhost'}${process.env.DEPLOY_PLATFORM === 'heroku'
                        ? ''
                        : `:${process.env.API_PORT ||
                            process.env.PORT}`}/subscriptions`,
                    websocketConnectionParams: {
                        token: process.env.GRAPHIQL_TOKEN
                    }
                },
                graphqlOptions: {
                    schema: null
                }
            },
        })
    ]
})
export class FrameworkImports {}