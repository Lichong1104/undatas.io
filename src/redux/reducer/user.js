const initState = {
  userInfo: {},
};

export const user = (state = initState, action) => {
  switch (action.type) {
    case "USER_INFO_CHANGE":
      return {
        ...state,
        userInfo: { ...state.userInfo, ...action.payload },
      };
    case "RESET_DATA":
      return initState;
    default:
      return state;
  }
};
