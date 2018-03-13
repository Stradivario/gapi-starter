import { Service, Container, Injector } from 'gapi';
import { Observable } from 'rxjs';
import { tester } from 'graphql-tester';
import { Sequelize } from 'sequelize-typescript';
import { generateEmail, generateName } from './randomNameGenerator';
import { AuthPrivateService } from '../services/auth/auth.service';

interface Response<T> {
    raw: string;
    data: T;
    errors: Array<{ message: string, name: string; time_thrown: string, data: {} }>;
    headers: {};
    status: number;
    success: boolean;
}

export interface SIGNITURE {
    token: string;
}

interface TESTERS {
    ADMIN?: SIGNITURE;
    USER?: SIGNITURE;
    ME?: SIGNITURE;
}

interface SendRequestQueryType {
    query: string;
    variables?: any;
    signiture?: SIGNITURE;
}

@Service()
export class AtcTestUtil {
    users: TESTERS = {};
    defaultPassword = '123456';
    private graphqlEndpoint = process.env.ENDPOINT_TESTING;
    private tester: any;
    private ME_TESTING_DATABASE_ID = 1;
    private ADMIN_TESTING_DATABASE_ID = 2;
    private USER_TESTING_DATABASE_ID = 3;

    @Injector(AuthPrivateService) private authService: AuthPrivateService;

    currentTestSignitures: Array<SIGNITURE> = [];
    // tslint:disable-next-line:max-line-length
    private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtyaXN0aXFuLnRhY2hldkBnbWFpbC5jb20iLCJzY29wZSI6WyJBRE1JTiJdLCJpZCI6MSwiaWF0IjoxNTE2OTk2MzYxfQ.7ANr5VHrViD3NkCaDr0nSWYwk46UAEbOwB52pqye4AM';

    constructor(

    ) {
        this.enableAuthorization();
    }


    disableAuthorization() {
        this.tester = tester({ url: this.graphqlEndpoint, contentType: 'application/json' });
    }

    enableAuthorization() {
        this.tester = tester({ url: this.graphqlEndpoint, contentType: 'application/json', authorization: this.token });
    }

    sendRequest<T>(query: SendRequestQueryType): Observable<Response<T>> {
        if (query.signiture) {
            this.tester = tester({
                url: process.env.ENDPOINT_TESTING,
                contentType: 'application/json',
                authorization: query.signiture.token
            });
        }
        return Observable.fromPromise(this.tester(JSON.stringify(query)));
    }


}
