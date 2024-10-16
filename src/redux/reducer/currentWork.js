const initState = {
  work: {
    currentWorkKey: "0",
  },
};

export const currentWork = (state = initState, action) => {
  switch (action.type) {
    case "WORK_CHANGE":
      return {
        ...state,
        work: action.payload,
      };
    case "RESET_DATA":
      return initState;
    default:
      return state;
  }
};
