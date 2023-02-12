import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store from "@/store";

import { Inter } from "@next/font/google";

import { SessionProvider } from "next-auth/react";

import { Footer, Header } from "@/components";

// Styles
import "@/styles/globals.scss";

const persistor = persistStore(store);

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <>
            <Header />
            <main className="content">
              <Component {...pageProps} />
            </main>
            <Footer />
          </>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}
