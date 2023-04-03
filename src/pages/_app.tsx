import Header from "../Components/Header";
import type { AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import Footer from "@/Components/Footer";
import { wrapper } from "../store";

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default wrapper.withRedux(app);
