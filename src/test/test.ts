import { sleep, check } from 'k6'
import { Options } from 'k6/options'
import http from 'k6/http'

export const options: Options = {
  vus: 50,
  duration: '10s',
}

export default () => {
  const res = http.get(process.env.LOAD_HOST!)
  check(res, {
    'status is 200': () => res.status === 200,
  })
  sleep(1)
}
