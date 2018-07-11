import qs from 'qs';
import request from './request';

// 对get、post、delete、put四种方法做简单封装
// 后面所有的请求都是调用这几个方法
export function get({ path, params }) {
  const pStr = params ? `?${qs.stringify(params)}` : '';
  return request(`${path}${pStr}`, {
    mode: 'cors',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

export function post({ path, params }) {
  return request(path, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(params),
  });
}

export function remove({ path, params }) {
  return request(path, {
    mode: 'cors',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(params),
  });
}

export function put({ path, params }) {
  return request(path, {
    mode: 'cors',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(params),
  });
}
