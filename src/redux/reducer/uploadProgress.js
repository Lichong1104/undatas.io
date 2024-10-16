const initState = {
  fileList: [],
  open: false,
};

export const uploadProgress = (state = initState, action) => {
  switch (action.type) {
    case "UPLOAD/ADD":
      return {
        ...state,
        fileList: [...action.payload, ...state.fileList],
      };
    case "UPLOAD/REMOVE":
      return {
        ...state,
        fileList: state.fileList.filter((item) => item !== action.payload),
      };
    case "UPLOAD/CHANGE_STATUS":
      return {
        ...state,
        fileList: state.fileList.map((item) => {
          if (item.key === action.payload.key) {
            return {
              ...item,
              status: action.payload.status,
              progress: action.payload.progress,
            };
          }
          return item;
        }),
      };
    case "CLEAR/PROGRESS":
      return {
        ...state,
        fileList: [],
      };
    case "PROGRESS/CHANGE":
      return {
        ...state,
        open: action.payload,
      };
    case "RESET_DATA":
      return initState;
    default:
      return state;
  }
};
