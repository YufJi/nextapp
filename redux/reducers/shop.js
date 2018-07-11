import { MERGE_SHOP_PROFILE_DATA } from '../actions/shop';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case MERGE_SHOP_PROFILE_DATA:
      return { profile: { list: payload } };
    default:
      return state;
  }
};
