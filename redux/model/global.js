
export default {
  namespace: 'global',
  state: {
    list: [],
    loading: false,
  },
  effects: {
    * fetchData({ payload }, { put }) {
      console.log(payload);
      yield put({
        type: 'toggleLoading',
        payload: true,
      });
      try {
        const data = [1, 2, 3, 4];
        yield put({
          type: 'setData',
          payload: data,
        });
        yield put({
          type: 'toggleLoading',
          payload: false,
        });
      } catch (e) {
        console.log(e);
      }
    },
    * changeLoading({ payload }, { put }) {
      console.log(payload);
      yield put({
        type: 'toggleLoading',
        payload: true,
      });
    },
  },
  reducers: {
    setData(state, { payload }) {
      return { ...state, list: payload };
    },
    toggleLoading(state, { payload }) {
      return { ...state, loading: payload };
    },
  },
};
