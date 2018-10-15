import global from './global';

function* rootSaga() {
  yield global();
}

export default rootSaga;
