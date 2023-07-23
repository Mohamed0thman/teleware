import axios, {AxiosResponse} from 'axios';

axios.defaults.baseURL = 'https://api.vatcomply.com/';
const responseBody = (response: AxiosResponse) => response.data;
const requests = {
  get: (url: string, params?: {[x: string]: string}) =>
    axios.get(url, {params}).then(responseBody),
};

const Currencies = {
  getCurrencies: () => requests.get('currencies'),

  getRates: (params?: {[x: string]: string}) => requests.get('rates', params),
};

const agent = {
  Currencies,
};

export default agent;
