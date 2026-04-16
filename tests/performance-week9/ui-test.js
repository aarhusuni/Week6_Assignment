import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  const res = http.get('https://practicesoftwaretesting.com');

  check(res, {
    'status is 200': (r) => r.status === 200,
    'page under 500ms': (r) => r.timings.duration < 500,
  });
}