import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // 使用localStorage

import { sideBarCollapsed } from "./reducer/sideBarCollapsed.js";
import { uploadProgress } from "./reducer/uploadProgress.js";
import { currentWork } from "./reducer/currentWork.js";
import { currentProject } from "./reducer/currentProject.js";
import { currentFile } from "./reducer/currentFile.js";
import { userAvatarReducer } from "./reducer/userAvatar.js";

// redux持久化
const persistConfig = {
  key: "root",
  storage, // 使用localStorage进行持久化
};

const rootReducer = combineReducers({
  sideBarCollapsed,
  uploadProgress,
  currentWork,
  currentProject,
  currentFile,
  userAvatarReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
