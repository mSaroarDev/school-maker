import { TTask } from "@/api/tasks/tasks.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface initialStateType {
  myTasks: TTask[];
}


const initialState: initialStateType = {
  myTasks: [],
}

const TasksSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<TTask[]>) => {
      state.myTasks = action.payload;
    },
    addTask: (state, action: PayloadAction<TTask>) => {
      state.myTasks.unshift(action.payload);
    },
    updateTask: (state, action: PayloadAction<TTask>) => {
      const index = state.myTasks.findIndex(task => task._id === action.payload._id);
      if (index !== -1) {
        state.myTasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      console.log("deleting task with id:", action.payload);
      state.myTasks = state.myTasks.filter(task => task._id !== action.payload);
    }
  }
})

export const {
  setTasks,
  addTask,
  updateTask,
  deleteTask
} = TasksSlice.actions;
export default TasksSlice.reducer;