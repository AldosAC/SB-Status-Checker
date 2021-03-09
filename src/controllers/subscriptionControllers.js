import axios from 'axios';
import { url } from '../config.js';

export function subscribe(email) {
  return axios.post(`${url}/api/recipients?email=${email}`)
    .catch((err) => console.log(`Failed to subscribe ${email}`));
}

export function unsubscribe(email) {
  return axios.delete(`${url}/api/recipients?email=${email}`)
    .catch((err) => console.log(`Failed to subscribe ${email}`));
}