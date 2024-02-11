import { Options } from 'k6/options';
import { AuthRequest } from 'app/actions/authentication';
import { Crocodiles } from 'app/actions/private';

export const options: Options = {
  vus: 1,
  duration: '10s',
  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },

  ext: {
    loadimpact: {
      projectID: 3629234,
      name: 'Smoke demo',
    },
  },
};

export function setup() {
  const token = new AuthRequest().auth(
    process.env.USER_NAME!,
    process.env.PASSWORD!,
  );

  return { token };
}

export default (data: { token: string }) => {
  const crocodiles = new Crocodiles(data.token);
  crocodiles.crocodiles();
};
