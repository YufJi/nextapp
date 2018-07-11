import { get } from '../util/method';

export function getShopData() {
  return get({
    path: '/v1/vehicle/category.json',
  });
}
