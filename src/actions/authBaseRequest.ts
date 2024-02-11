import { BaseRequest } from 'app/actions/baseRequest';

export abstract class AuthBaseRequest extends BaseRequest {
  constructor(readonly token: string) {
    super();
  }
}
