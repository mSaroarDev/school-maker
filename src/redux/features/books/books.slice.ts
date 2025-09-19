import { TBooks } from "@/api/books/books.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface initialStateType {
  books: TBooks[];
  totalResuls: number;
}


const initialState: initialStateType = {
  books: [] as TBooks[],
  totalResuls: 0,
}

const BooksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<TBooks[]>) => {
      state.books = action.payload;
    },
    setTotalCounts: (state, action: PayloadAction<number>) => {
      state.totalResuls = action.payload;
    },
    updateBook: (state, action: PayloadAction<TBooks>) => {
      const index = state.books.findIndex(book => book._id === action.payload._id);
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    },
    addBook: (state, action: PayloadAction<TBooks>) => {
      state.books.unshift(action.payload);
      state.totalResuls += 1;
    },
    deleteBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter(book => book._id !== action.payload);
      state.totalResuls -= 1;
    }
  }
})

export const {
  setBooks,
  setTotalCounts,
  updateBook,
  addBook,
  deleteBook
} = BooksSlice.actions;
export default BooksSlice.reducer;