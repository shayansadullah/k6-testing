import http from 'k6/http'
import {check, sleep} from 'k6'

export const options = {
    vus: 2,
    duration: '5s'
}

export function setup() {
    console.log('1. setup code');
}

export default function(data) {
    console.log('2. VU Code');
    const result = http.get('https://test-api.k6.io/');

    check(result, {
        'status was 200': (r) => r.status == 200, 
        'Duration < 500ms': (r) => r.timings.duration < 500
    });

    sleep(1)
}

export function teardown() {
    console.log('3. Teardown')
}