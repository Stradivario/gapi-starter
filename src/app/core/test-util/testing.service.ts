import { Service, Container, Injector } from 'gapi';
import { Observable } from 'rxjs';
import { tester } from 'graphql-tester';
import { Sequelize } from 'sequelize-typescript';
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

    private tester: any;

    @Injector(AuthPrivateService) private authService: AuthPrivateService;

    constructor(

    ) {
        this.enableAuthorization();
    }

    disableAuthorization() {
        this.tester = tester({ url: process.env.ENDPOINT_TESTING, contentType: 'application/json' });
    }

    enableAuthorization() {
        this.tester = tester({ url: process.env.ENDPOINT_TESTING, contentType: 'application/json', authorization: process.env.TOKEN});
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
