import { getSession, SessionProvider } from "next-auth/react";

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store from "@/store";

import { Toaster } from "react-hot-toast";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";

// Styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

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
            <Header country={pageProps.country} />
            <main className="content">
              <Toaster />
              <Component {...pageProps} />
            </main>
            <Footer />
          </>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  // const res = await axios.get(
  //   `https://api.ipregistry.co/197.40.209.35?key=ww5bo722kw5p5pim`
  // );
  // const country = res.data.location.country;

  const country = {
    name: "Egypt",
    flag: {
      emojitwo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/2560px-Flag_of_Egypt.svg.png",
    },
  };

  const session = await getSession(ctx);

  return { pageProps: { country, session, ...pageProps } };
};
