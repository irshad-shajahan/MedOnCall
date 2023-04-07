import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { activeNav } from "./features/activeNav";

const persistConfig={
    key: "root",
    version:1,
    storage
};

const reducer = combineReducers({
    activeNav:activeNav.reducer
})

const persistedReducer = persistReducer(persistConfig,reducer)

export default configureStore({
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    reducer:persistedReducer
})