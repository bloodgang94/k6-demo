import { BaseRequest } from 'app/actions/baseRequest';
import http from 'k6/http';
import {
  describe,
  expect,
} from 'https://jslib.k6.io/k6chaijs/4.3.4.2/index.js';

export class AuthRequest extends BaseRequest {
  auth(username: string, password: string): string {
    const loginRes = http.post(`${this.baseUrl}/auth/token/login/`, {
      username: username,
      password: password,
    });

    describe('logged in successfully', () => {
      expect(loginRes.status, 'response status').to.equal(200);
      expect(loginRes.json('access')).not.to.be.empty;
    });

    return loginRes.json('access') as string;
  }
}
