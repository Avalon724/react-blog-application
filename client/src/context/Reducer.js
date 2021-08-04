const Reducer = (state, action) => {
  switch (action.type) {
    case "  REGISTER_START":
      return {
        ...state,
        isFetching: true,
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isFetching: false,
      };
    // case "REGISTER_FAIL":
    //   return {
    //     ...state,
    //     error: false,
    //   };
    default:
      return state;
  }
};

export default Reducer;
