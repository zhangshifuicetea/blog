import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  counter: counterReducer,
});

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;

