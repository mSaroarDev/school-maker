import { TEventResponse } from "@/api/events/events.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface initialStateType {
  books: TEventResponse[];
}


const initialState: initialStateType = {
  books: [] as TEventResponse[],
}

const BooksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
   
  }
})

export const { 
  
} = BooksSlice.actions;
export default BooksSlice.reducer;