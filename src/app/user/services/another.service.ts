import { Service } from '@rxdi/core';

@Service()
export class AnotherService {
  trimFirstLetter(username: string): string {
    return username.charAt(1);
  }

  trimFirstLetterAsync(username): Promise<string> {
    return Promise.resolve(this.trimFirstLetter(username));
  }

  returnTrueAsync() {
    return Promise.resolve(true);
  }
}
