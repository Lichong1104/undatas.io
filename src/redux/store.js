import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";

import { sideBarCollapsed } from "./reducer/sideBarCollapsed.js";
import { uploadProgress } from "./reducer/uploadProgress.js";
import { currentWork } from "./reducer/currentWork.js";
import { currentProject } from "./reducer/currentProject.js";
import { currentFile } from "./reducer/currentFile.js";

// redux持久化
const persistConfig = {
  key: "root",
  storage: sessionStorage,
};

const rootReducer = combineReducers({
  sideBarCollapsed,
  uploadProgress,
  currentWork,
  currentProject,
  currentFile,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
