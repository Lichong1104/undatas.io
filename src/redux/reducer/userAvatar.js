const initialState = {
  avatar: sessionStorage.getItem("userAvatar") || "",
};

export const userAvatarReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_AVATAR":
      return { ...state, avatar: action.payload };
    default:
      return state;
  }
};
