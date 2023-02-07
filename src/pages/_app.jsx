import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store from "@/store";

import { Inter } from "@next/font/google";

// Styles
import "@/styles/globals.scss";
import { Footer, Header } from "@/components";

const persistor = persistStore(store);

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <>
          <Header />
          <main>
            <Component {...pageProps} />
          </main>
          <Footer />
        </>
      </PersistGate>
    </Provider>
  );
}
