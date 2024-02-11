import { Options } from 'k6/options';
import { AuthRequest } from 'app/actions/authentication';
import { Crocodiles } from 'app/actions/private';

export const options: Options = {
  stages: [
    { duration: '1m', target: 6 },
    { duration: '1m', target: 6 },
    { duration: '1m', target: 10 },
    { duration: '1m', target: 10 },
    { duration: '1m', target: 6 },
    { duration: '1m', target: 6 },
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },

  ext: {
    loadimpact: {
      projectID: 3629234,
      name: 'Load demo',
    },
  },
};

export function setup() {
  const token = new AuthRequest().auth(__ENV.USER_NAME!, __ENV.PASSWORD!);
  return { token };
}

export default (data: { token: string }) => {
  const crocodiles = new Crocodiles(data.token);
  crocodiles.crocodiles();
};
