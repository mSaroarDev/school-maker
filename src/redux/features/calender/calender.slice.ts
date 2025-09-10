import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Notification {
  _id: string;
  userId: string;
  message: string;
  notifyTo: string[];
  seenBy: string[];
  link: string;
  createdAt: string;
  updatedAt: string;
};

interface initialStateType {
  notifications: Notification[];
  unreadCount: number;
}


const initialState: initialStateType = {
  notifications: [],
  unreadCount: 0,
}

const CalenderSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    pushNewNotifications: (state, action: PayloadAction<Notification[]>) => {
      const newNotifications = action.payload;
      state.notifications = [...newNotifications, ...state.notifications];
    },
    setCount: (state, action) => {
      state.unreadCount = action.payload;
    },
  }
})

export const { pushNewNotifications, setCount } = CalenderSlice.actions;
export default CalenderSlice.reducer;