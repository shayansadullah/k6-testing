import http from 'k6/http'
import {check, sleep} from 'k6'

export let options = {
    discardResponseBodies: true,
    scenarios: {
        contacts: {
            executor: 'ramping-arrival-rate',
            startRate: 5,
            preAllocatedVUs: 100,
            stages: [
                {duration: '10s', target: 5},
                {duration: '10s', target: 10},
            ],
        },
    },
    thresholds: {
        "http_req_duration": [{
            threshold: "p(95) < 200"
        },],
    "checks": [{
        threshold: "rate>0.9"
    },],
    },
};

export default function() {
    http.get('https://test.k6.io/contacts.php')
    sleep(5)
}