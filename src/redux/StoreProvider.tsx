"use client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";

interface StoreProviderProps {
  children: React.ReactNode;
}

const StoreProvider = ({ children }: StoreProviderProps) => {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </>
  );
};

export default StoreProvider;