import { configureStore } from '@reduxjs/toolkit'
import taskListReducer from './taskSlice';
import { loadState, saveState } from 'src/utils/persist';

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    taskList: taskListReducer
  },
  devTools: true,
  preloadedState: persistedState,
})

store.subscribe(() => {
  saveState({
    ...store.getState()
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;