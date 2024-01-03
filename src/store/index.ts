import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userApi } from './services/userAuth.service';
import customizationReducer from './customizationReducer';
import { clientApi } from './services/client.service';
import { devApi } from './services/dev.service';
import { roleApi } from './services/role.service';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { unauthenticatedMiddleware } from './middleware/unauthenticatedMiddleware';
import { rtkQueryErrorLogger } from './middleware/err';

import { applicantApi } from './services/application.service';
import storage from 'redux-persist/lib/storage';
import devReducer from './slices/dev.slice';
import { interviewApi } from './services/interview.service';
import { APPLICATION_API_KEY, CLIENT_API_KEY, DEV_API_KEY, INTERVEW_API_KEY, ROLE_API_KEY, USER_API_KEY } from './constant';

const reducers = {
  devs: devReducer,
  [USER_API_KEY]: userApi.reducer,
  [CLIENT_API_KEY]: clientApi.reducer,
  [INTERVEW_API_KEY]: interviewApi.reducer,
  [DEV_API_KEY]: devApi.reducer,
  [ROLE_API_KEY]: roleApi.reducer,
  [APPLICATION_API_KEY]: applicantApi.reducer,
  customization: customizationReducer,
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [DEV_API_KEY, ROLE_API_KEY, APPLICATION_API_KEY, INTERVEW_API_KEY, CLIENT_API_KEY, USER_API_KEY],
};

const persistedReducer = persistReducer(persistConfig, combinedReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      unauthenticatedMiddleware,
      rtkQueryErrorLogger,
      userApi.middleware,
      clientApi.middleware,
      interviewApi.middleware,
      roleApi.middleware,
      devApi.middleware,
      applicantApi.middleware,
    ]),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof combinedReducer>;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
