import http from 'k6/http'
import {check, sleep} from 'k6'

export let options = {
    thresholds: {
        "http_req_duration": [{
            threshold: "p(95)<200"
        }],
        "checks": [{
            threshold: "rate>0.9"
        }]
    },
    stages: [
        {duration: '2s', target: 5},
        {duration: '3s', target: 10},
        {duration: '3s', target: 5},
        {duration: '2s', target: 1}
    ]
};

export default function(data) {
    console.log('2. VU Code');
    const result = http.get('https://test-api.k6.io/');

    check(result, {
        'status was 200': (r) => r.status == 200, 
        'Duration < 500ms': (r) => r.timings.duration < 500
    });

    sleep(1)
}