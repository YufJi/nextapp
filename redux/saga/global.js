import { effects } from 'redux-saga/dist/redux-saga';

const { call, put, takeEvery } = effects;

const namespace = 'global';

function* onInput({ payload }) {
  yield put({
    type: 'SETDATA',
    payload,
  });
}

export default function* global() {
  yield takeEvery(`${namespace}/onInput`, onInput);
}
