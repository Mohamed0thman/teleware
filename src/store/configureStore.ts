import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import settingSlice from './slices/settingSlice';
import mainSlice from './slices/mainSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['setting'],
};
const rootReducer = combineReducers({
  setting: settingSlice.reducer,
  main: mainSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
