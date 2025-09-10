import { TEventResponse } from "@/api/events/events.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface initialStateType {
  calenderEvents: TEventResponse[];
  totalEventCount: number;
}


const initialState: initialStateType = {
  calenderEvents: [] as TEventResponse[],
  totalEventCount: 0
}

const CalenderSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
   setEvents: (state, action: PayloadAction<TEventResponse[]>) => {
    state.calenderEvents = action.payload;
   },
   setTotalEventCount: (state, action: PayloadAction<number>) => {
    state.totalEventCount = action.payload;
   },
   addEvent: (state, action: PayloadAction<TEventResponse>) => {
    state.calenderEvents.push(action.payload);
   }
  }
})

export const { 
  setEvents, 
  setTotalEventCount,
  addEvent
} = CalenderSlice.actions;
export default CalenderSlice.reducer;