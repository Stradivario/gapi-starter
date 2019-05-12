import { Container, createTestBed } from '@rxdi/core';
import { IQuery } from '../core/api-introspection/index';
import { map } from 'rxjs/operators';
import { UserQueriesController } from './user-queries.controller';
import { UserMutationsController } from './user-mutations.controller';
import {
  HapiModule,
  GraphQLModule,
  setConfigServer,
  setConfigGraphql,
  HAPI_SERVER,
  sendRequest
} from '@gapi/core';
import { Server } from 'hapi';
import { from } from 'rxjs';
import { CoreModule } from '../core/core.module';
import { AuthModule } from '@gapi/auth';
import { readFileSync } from 'fs';

describe('User Queries Controller', () => {
  beforeAll(async () => {
    await createTestBed(
      {
        imports: [
          CoreModule,
          AuthModule.forRoot({
            algorithm: 'HS256',
            cert: readFileSync('./cert.key'),
            cyper: {
              algorithm: 'aes256',
              iv: 'Jkyt1H3FA8JK9L3B',
              privateKey: '8zTVzr3p53VC12jHV54rIYu2545x47lA'
            }
          })
        ],
        controllers: [UserQueriesController, UserMutationsController]
      },
      [
        HapiModule.forRoot(setConfigServer()),
        GraphQLModule.forRoot(setConfigGraphql())
      ]
    ).toPromise();
  });

  afterAll(async () => await Container.get<Server>(HAPI_SERVER).stop());

  it('e2e: queries => (findUser) : Should sucessfully find user', async done => {
    from(
      sendRequest<IQuery>({
        query: `
      query findUser($id: Int!) {
        findUser(id: $id) {
          id
          email
          type
          password
          name
          settings {
            sidebar
          }
        }
      }
    `,
        variables: {
          id: 1
        }
      })
    )
      .pipe(
        map(res => {
          expect(res.success).toBeTruthy();
          return res.data.findUser;
        })
      )
      .subscribe(
        async res => {
          expect(res.id).toBe(1);
          expect(res.settings.sidebar).toBeTruthy();
          expect(res.email).toBeTruthy();
          expect(res.name).toBeTruthy();
          expect(res.password).toBeTruthy();
          expect(res.type).toBe('ADMIN');
          done();
        },
        err => {
          expect(err).toBe(null);
          done();
        }
      );
  });

  it('e2e: queries => (loginUser) : Should sucessfully login user and return JWT Token', async done => {
    from(
      sendRequest<IQuery>({
        query: `
        query login($email:String!, $password:String!) {
          login(email: $email, password: $password) {
            token
            user {
            id
              email
              type
              password
              name
              settings {
                sidebar
              }
            }
          }
        }
      `,
        variables: {
          email: 'testing@gmail.com',
          password: '123456'
        }
      })
    )
      .pipe(
        map(res => {
          expect(res.success).toBeTruthy();
          return res.data.login;
        })
      )
      .subscribe(
        async res => {
          expect(res.token).toBeTruthy();
          expect(res.user.email).toBe('testing@gmail.com');
          expect(res.user.name).toBeTruthy();
          expect(res.user.password).toBeTruthy();
          expect(res.user.type).toBe('ADMIN');
          expect(res.token).toBeTruthy();
          done();
        },
        err => {
          expect(err).toBe(null);
          done();
        }
      );
  });
});
