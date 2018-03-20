import { AtcTestUtil } from '../core/test-util/testing.service';
import { LOGIN_QUERY_TEST } from '../core/test-util/queries/login.query';
import { REGISTER_MUTATION } from '../core/test-util/mutations/register.mutation';
import { FIND_USER_QUERY_TEST } from '../core/test-util/queries/findUser.query';
import { AuthPrivateService } from '../core/services/auth/auth.service';
import { Container } from 'gapi';

const atcTestUtil: AtcTestUtil = Container.get(AtcTestUtil);

describe('User Queries Controller', () => {

  it('e2e: queries => (findUser) : Should sucessfully find user', async done => {
    atcTestUtil.sendRequest<any>({
      query: FIND_USER_QUERY_TEST,
      variables: {
        id: 1
      }
    })
      .map(res => {
        expect(res.success).toBeTruthy();
        return res.data.findUser;
      })
      .subscribe(async res => {
        expect(res.id).toBe(1);
        expect(res.settings.username).toBe('o');
        expect(res.settings.firstname).toBe('pesho');
        done();
      }, err => {
        expect(err).toBe(null);
        done();
      });
  });

//   it('e2e: query => (login) : Should sucessfully login user and return authentication token', async done => {
//     atcTestUtil.sendRequest<IQuery>({
//       query: LOGIN_QUERY_TEST,
//       variables: {
//         email: atcTestUtil.users.USER.credential.email,
//         password: Container.get(AuthPrivateService).decryptPassword(atcTestUtil.users.USER.credential.password)
//       }
//     })
//       .map(res => {
//         expect(res.success).toBeTruthy();
//         return res.data.login;
//       })
//       .subscribe(res => {
//         expect(res.token).toBeTruthy();
//         expect(res.email).toBe(atcTestUtil.users.USER.credential.email);
//         expect(res.user.credential[0].password).toBe(atcTestUtil.users.USER.credential.password);
//         done();
//       }, err => {
//         expect(err).toBe(null);
//         done();
//       });
//   });


//   it('e2e: query => (register) : Should sucessfully register user', async done => {
//     const fakeUser = {
//       name: generateName(),
//       email: generateEmail(),
//       password: atcTestUtil.defaultPassword
//     };
//     atcTestUtil.sendRequest<IMutation>({
//       query: REGISTER_MUTATION,
//       variables: fakeUser
//     })
//       .map(res => {
//         expect(res.success).toBeTruthy();
//         return res.data.register;
//       })
//       .subscribe(async res => {
//         expect(res.name).toBeTruthy();
//         expect(res.credential.email).toBe(fakeUser.email);
//         expect(res.credential.password).toBe(Container.get(AuthPrivateService).encryptPassword(atcTestUtil.defaultPassword));
//         await User.destroy({ where: { id: res.id }});
//         await Credential.destroy({ where: { userId: res.id } });
//         done();
//       }, err => {
//         expect(err).toBe(null);
//         done();
//       });
//   });

});
