import initialState from "../store/initialState";

export const timerReducer = (state = initialState.timer, { type, payload }) => {
  switch (type) {
    case "TICK":
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
