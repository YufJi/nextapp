
export const MERGE_SHOP_PROFILE_DATA = 'MERGE_SHOP_PROFILE_DATA';

export const fetchListData = obj => (dispatch) => {
  const data = obj;
  dispatch({
    type: MERGE_SHOP_PROFILE_DATA,
    payload: data,
  });
};
