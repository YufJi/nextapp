import { Toast } from 'antd-mobile';
import { getShopData } from '../../service/shop';

export const MERGE_SHOP_PROFILE_DATA = 'MERGE_SHOP_PROFILE_DATA';

export const fetchListData = obj => async (dispatch) => {
  const data = await getShopData(obj);
  dispatch({
    type: MERGE_SHOP_PROFILE_DATA,
    payload: data,
  });
};
