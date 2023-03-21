const initialState = null;

const reducer = (state = initialState, action) => {

  if (action) {
    switch (action.type) {
      case "setLoggedInUser":
        return action.payload;
      default:
        return state;
    }
  }
};
export default reducer;
