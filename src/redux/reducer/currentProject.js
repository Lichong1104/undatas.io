const initState = {
  project: {},
};

export const currentProject = (state = initState, action) => {
  switch (action.type) {
    case "PROJECT_CHANGE":
      return {
        ...state,
        project: action.payload,
      };
    case "RESET_DATA":
      return initState;
    default:
      return state;
  }
};
