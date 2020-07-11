import { Container, setup } from '@rxdi/core';
import { AuthService } from './auth.service';
import { AuthModule } from '@gapi/auth';
import { readFileSync } from 'fs';

let authService: AuthService;

beforeAll(async () => {
  await setup({
    services: [AuthService],
    imports: [
      AuthModule.forRoot({
        algorithm: 'HS256',
        cert: readFileSync('./cert.key'),
        cyper: {
          algorithm: 'aes256',
          iv: 'Jkyt1H3FA8JK9L3B',
          privateKey: '8zTVzr3p53VC12jHV54rIYu2545x47lA'
        }
      })
    ]
  }).toPromise();
  authService = Container.get(AuthService);
});

describe('Auth Service', () => {
  it('unit: signJWTtoken => token : Should sucessfully sign jwt', async done => {
    const token = authService.signJWTtoken({
      email: 'dada@abv.bg',
      id: 1,
      scope: ['ADMIN']
    });
    expect(token).toBeTruthy();
    const verifyedToken = authService.verifyToken(token);
    expect(verifyedToken.email).toBe('dada@abv.bg');
    expect(verifyedToken.id).toBe(1);
    expect(verifyedToken.scope[0]).toBe('ADMIN');
    done();
  });

  it('unit: encryptPassword <=> decryptPassword : Should sucessfully encrypt and decrypt user password', async done => {
    const password = '123456';
    const encrypted = authService.encryptPassword(password);
    const decrypted = authService.decryptPassword(encrypted);
    expect(decrypted).toBe(password);
    done();
  });
});
