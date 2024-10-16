const initState = {
  file: {},
};

export const currentFile = (state = initState, action) => {
  switch (action.type) {
    case "FILE_CHANGE":
      return {
        ...state,
        file: action.payload,
      };
    case "RESET_DATA":
      return initState;
    default:
      return state;
  }
};
