import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice';
import articleReducer from '../features/article/articleSlice';

const rootReducer = combineReducers({
  user: userReducer,
  article: articleReducer,
});

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;

