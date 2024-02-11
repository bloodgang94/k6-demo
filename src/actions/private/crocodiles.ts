import { AuthBaseRequest } from 'app/actions/authBaseRequest';
import http from 'k6/http';
import {
  describe,
  expect,
} from 'https://jslib.k6.io/k6chaijs/4.3.4.2/index.js';

export class Crocodiles extends AuthBaseRequest {
  private readonly authHeaders: {
    [key: string]: string;
  };

  constructor(readonly token: string) {
    super(token);
    this.authHeaders = {
      Authorization: `Bearer ${this.token}`,
    };
  }

  crocodiles() {
    const response = http.get(`${this.baseUrl}/my/crocodiles`, {
      headers: this.authHeaders,
    });

    describe('create crocodiles', () => {
      expect(response.status, 'response status').to.equal(200);
      expect(response.json()).to.be.an('array').that.is.not.empty;
    });
  }
}
