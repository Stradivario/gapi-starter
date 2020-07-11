import { Service } from '@rxdi/core';
import { Observable, from } from 'rxjs';
import { tester } from 'graphql-tester';

interface Response<T> {
  raw: string;
  data: T;
  errors: Array<{
    message: string;
    name: string;
    time_thrown: string;
    data: {};
  }>;
  headers: {};
  status: number;
  success: boolean;
}

export interface SIGNITURE {
  token: string;
}

interface SendRequestQueryType {
  query: string;
  variables?: any;
  signiture?: SIGNITURE;
}

@Service()
export class TestUtil {
  private tester: any;

  constructor() {
    this.enableAuthorization();
  }

  disableAuthorization() {
    this.tester = tester({
      url: process.env.ENDPOINT_TESTING,
      contentType: 'application/json'
    });
  }

  enableAuthorization() {
    this.tester = tester({
      url: process.env.ENDPOINT_TESTING,
      contentType: 'application/json',
      authorization: process.env.TOKEN_TESTING
    });
  }

  sendRequest<T>(query: SendRequestQueryType): Observable<Response<T>> {
    if (query.signiture) {
      this.tester = tester({
        url: process.env.ENDPOINT_TESTING,
        contentType: 'application/json',
        authorization: query.signiture.token
      });
    }
    return <any>from(this.tester(JSON.stringify(query)));
  }
}
