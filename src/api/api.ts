import axios from 'axios';
import { createAuthData } from '../utils/helpers';
import { baseURL } from '../utils/constants';

export const instance = axios.create({
  baseURL: baseURL,
  headers: { 'X-Auth': createAuthData() },
});
