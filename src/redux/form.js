import { SAVE_FORM } from "./actions"

const initState = {
  formData: {},
};

const reducer = (state = initState, action) => {
  const { payload, type } = action;
  if (type === SAVE_FORM) {
    return {
      ...state,
      payload,
    };
  }
  return state;
};

export default reducer