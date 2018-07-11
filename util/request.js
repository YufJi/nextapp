import 'isomorphic-fetch';
import { Toast } from 'antd-mobile';
import { prefix } from '../env.config';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) return response;
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function checkBackendCustomStatus(data) {
  const { code, message, data: resData } = data;
  if (Number(code) === 1) {
    return resData;
  } else {
    throw message;
  }
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(prefix + url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(checkBackendCustomStatus)
    .catch((err) => {
      Toast.fail('接口请求失败');
    });
}
