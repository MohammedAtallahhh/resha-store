import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store from "@/store";

import { Inter } from "@next/font/google";

// Styles
import "@/styles/globals.scss";
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const persistor = persistStore(store);

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <main className={inter.className}>
          <Component {...pageProps} />
        </main>
      </PersistGate>
    </Provider>
  );
}
