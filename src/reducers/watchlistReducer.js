export const initialState = {
  topFive: null,
  secondTier: null,
};

export const watchlistReducer = (state, action) => {
  switch (action.type) {
    case "init":
      return action.payload;
    case "update":
      return {
        ...state,
        [action.payload.tier]: action.payload.updateValue,
      };
    case "reset":
      return initialState;
    default:
      throw new Error();
  }
};
