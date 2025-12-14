import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./configureStore";

export interface taskListState {
  list: Task[];
  notification: string;
}

const initialState: taskListState = {
  list: [],
  notification: "",
};

const MAX_UNCOMPLETED = 10;

const getUncompletedCount = (list: Task[]) => list.filter((x) => !x.done).length;

export const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task["header"]>) => {
      // Защита на уровне стора: нельзя создать больше 10 невыполненных задач
      if (getUncompletedCount(state.list) >= MAX_UNCOMPLETED) {
        return;
      }

      state.list.push({
        id: crypto.randomUUID(),
        header: action.payload,
        done: false,
      });
    },
    completeTask: (state, action: PayloadAction<Task["id"]>) => {
      const task = state.list.find((x) => x.id === action.payload);

      if (task) {
        task.done = true;
      }
    },
    toggleTask: (state, action: PayloadAction<Task["id"]>) => {
      const task = state.list.find((x) => x.id === action.payload);

      if (task) {
        // Если задача переводится из выполненной в невыполненную,
        // то не даём превысить лимит невыполненных задач.
        if (task.done === true && getUncompletedCount(state.list) >= MAX_UNCOMPLETED) {
          return;
        }

        task.done = !task.done;

        if (task.done) {
          state.notification = `Задача "${task.header}" завершена`;
        }
      }
    },
    deleteTask: (state, action: PayloadAction<Task["id"]>) => {
      state.list = state.list.filter((x) => x.id !== action.payload);
    },
    setNotification: (state, action: PayloadAction<Task["header"]>) => {
      state.notification = `Задача "${action.payload}" завершена`;
    },
    clearNotification: (state) => {
      state.notification = "";
    },
    resetState: () => initialState,
  },
});

export const {
  addTask,
  completeTask,
  deleteTask,
  toggleTask,
  clearNotification,
  resetState,
} = taskListSlice.actions;

export default taskListSlice.reducer;

export const tasksSelector = (state: RootState) => state.taskList.list;

export const fullCount = (state: RootState) => state.taskList.list.length;

export const completeCount = (state: RootState) =>
  state.taskList.list.filter((x) => x.done).length;

export const uncompleteCount = (state: RootState) =>
  Math.min(MAX_UNCOMPLETED, state.taskList.list.filter((x) => !x.done).length);

// Селектор списка с защитой: возвращает список, в котором максимум 10 невыполненных задач
export const limitedTasksSelector = (state: RootState) => {
  const list = state.taskList.list;
  let uncompletedLeft = MAX_UNCOMPLETED;

  return list.filter((task) => {
    if (task.done) return true;
    if (uncompletedLeft <= 0) return false;
    uncompletedLeft -= 1;
    return true;
  });
};

export const getNotification = (state: RootState) =>
  state.taskList.notification