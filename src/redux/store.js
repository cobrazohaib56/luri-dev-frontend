import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import userReducer from "./slices/userSlice";
import { combineReducers } from "redux";


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'] // only user reducer will be persisted, add more if needed
};

const rootReducer = combineReducers({
  user: userReducer, 
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  // reducer: rootReducer,
});

export const persistor = persistStore(store);
