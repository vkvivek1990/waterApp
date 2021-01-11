import { GET_FORM_DETAIL } from "./actions"

const initState = {
  data: [],
};

const reducer = (state = initState, action) => {
  const { payload, type } = action;
  if (type === GET_FORM_DETAIL) {
    return {
      ...state,
      payload,
    };
  }
  return state;
};

export default reducer