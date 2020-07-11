import { Module } from '@rxdi/core';
import { AuthService } from './services/auth/auth.service';
import {
  // HookService,
  // RESOLVER_HOOK,
  // GenericGapiResolversType,
  ON_REQUEST_HANDLER,
  GRAPHQL_PLUGIN_CONFIG,
  Boom
} from '@gapi/core';
import { ResponseToolkit, Request } from 'hapi';

@Module({
  services: [
    AuthService,
    // Custom hook for every resolver Query, Mutation (Subscription for now needs authentication set inside framework-imports.ts pubsub: { authentication: AuthService })
    // If you do try to use custom logic here remove from framwork-imports.ts graphql: { authentication: AuthService }
    // {
    //   provide: RESOLVER_HOOK,
    //   deps: [HookService],
    //   useFactory: (hookService: HookService) => (
    //     resolver: GenericGapiResolversType
    //   ) => {
    //       const resolve = resolver.resolve.bind(resolver.target);
    //       resolver.resolve = function(root, args, context, info, ...a) {
    //       console.log(resolver);
    //       hookService.ResolverHooks(<any>resolver, root, args, context, info);
    //       return resolve(root, args, context, info, ...a);
    //     };
    //   }
    // },
    {
      provide: ON_REQUEST_HANDLER,
      deps: [AuthService, GRAPHQL_PLUGIN_CONFIG],
      useFactory: (auth: AuthService, config: GRAPHQL_PLUGIN_CONFIG) => async (
        next,
        request: Request,
        h: ResponseToolkit,
        err: Error
      ) => {
        if (
          request.headers.authorization &&
          request.headers.authorization !== 'undefined'
        ) {
          try {
            config.graphqlOptions.context = await auth.validateToken(
              request.headers.authorization
            );
            config.graphqlOptions.context['user'] =
              config.graphqlOptions.context;
          } catch (e) {
            return Boom.unauthorized();
          }
        } else {
          config.graphqlOptions.context = null;
        }
        return next();
      }
    }
  ]
})
export class CoreModule {}
