import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.BASEURL,
  headers: {
    'Content-type': 'application/json',
    'Accept-Encoding': 'gzip, deflate',
    'Content-Encoding': 'gzip',
  },
});

export const fetcher = (url: string) =>
  instance
    .get(url)
    .then((res) => res.data)
    .catch((err) => err);
