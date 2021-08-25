export const initialState = {
  searchType: 0,
  query: null,
  albumResults: null,
  artistResults: null,
  artistURL: null,
};

export const DiscogsSearchReducer = (state, action) => {
  switch (action.type) {
    case "update":
      return {
        ...state,
        [action.payload.location]: action.payload.updateValue,
      };
    default:
      throw new Error();
  }
};
