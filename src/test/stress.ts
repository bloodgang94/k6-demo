import { Options } from 'k6/options';
import { AuthRequest } from 'app/actions/authentication';
import { Crocodiles } from 'app/actions/private';

export const options: Options = {
  scenarios: {
    stress: {
      //https://k6.io/docs/using-k6/scenarios/executors/
      // -> Each one schedules VUs and iterations differently,
      //    and you'll choose one depending on the type of traffic you want to model to test your services.
      // -> ramping-arrival-rate: 	A variable number of iterations are executed in a specified period of time.
      // More info about this executor: https://k6.io/docs/using-k6/scenarios/executors/ramping-arrival-rate/
      executor: 'ramping-arrival-rate',
      //Number of VUs to pre-allocate before test start to preserve runtime resources.
      preAllocatedVUs: 500,
      timeUnit: '1s',
      // Period of time to apply the startRate to the stages' target value.
      // Its value is constant for the whole duration of the scenario, it is not possible to change it for a specific stage.
      stages: [
        { duration: '2m', target: 10 }, // below normal load
        { duration: '5m', target: 10 },
        { duration: '2m', target: 20 }, // normal load
        { duration: '5m', target: 20 },
        { duration: '2m', target: 30 }, // around the breaking point
        { duration: '5m', target: 30 },
        { duration: '2m', target: 40 }, // beyond the breaking point
        { duration: '5m', target: 40 },
        { duration: '10m', target: 0 }, // scale down. Recovery stage.
      ],
    },
  },
  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },

  ext: {
    loadimpact: {
      projectID: 3629234,
      name: 'Stress demo',
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
