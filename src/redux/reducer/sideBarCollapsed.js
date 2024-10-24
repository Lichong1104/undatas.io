const initState = {
  collapsed: false,
};

export const sideBarCollapsed = (state = initState, action) => {
  switch (action.type) {
    case "COLLAPSED/TRUE":
      return {
        collapsed: true,
      };
    case "COLLAPSED/FALSE":
      return {
        collapsed: false,
      };
    case "RESET_DATA":
      return initState;
    default:
      return state;
  }
};
