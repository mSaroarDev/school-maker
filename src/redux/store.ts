import { combineReducers, configureStore, type UnknownAction } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { type PersistConfig } from "redux-persist";

// redux slices
import CalenderSlice from '@/redux/features/calender/calender.slice';

// First define the app reducer
const appReducer = combineReducers({
  calender: CalenderSlice,
});

// Root state type from combined reducers
export type RootState = ReturnType<typeof appReducer>;

// Persist config with proper typing
const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
};

// Root reducer with LOGOUT handling - must be defined after appReducer
const rootReducer = (state: RootState | undefined, action: UnknownAction): RootState => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export const resetStore = () => {
  store.dispatch({ type: "LOGOUT" });
  persistor.purge();
};

// Type helpers
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;