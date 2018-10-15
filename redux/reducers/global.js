const initialState = {
  name: '123',
};

export default function global(state = initialState, { type, payload }) {
  switch (type) {
    case 'SETDATA':
      return { ...state, name: payload };
    default:
      return state;
  }
}
