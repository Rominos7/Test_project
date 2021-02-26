import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import taskListReducer from './reducers/taskListReducer';

export const store = configureStore({
  reducer: {
    taskList: taskListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;