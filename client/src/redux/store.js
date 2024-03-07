import {configureStore,combineReducers} from '@reduxjs/toolkit';
import userSlice from './user/userSlice';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const rootreducer = combineReducers({user:userSlice})

const persistConfig = {
    key: 'root',
    storage,
    version:1,
  }

  const persistedReducer = persistReducer(persistConfig,rootreducer)

export const store = configureStore({
    reducer:{user:userSlice},
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:false,
    }),
})

export const persistor= persistStore(store);



