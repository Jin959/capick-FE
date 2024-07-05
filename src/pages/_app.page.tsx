import {ChakraProvider} from "@chakra-ui/react";
import type {AppProps} from "next/app";
import {Global} from "@emotion/react";
import theme from "@/styles/theme";
import globalStyle from "@/styles/global";
import Layout from "@/components/common/Layout";
import SeoHead from "@/components/common/SeoHead";
import GlobalProvider from "@/contexts/GlobalProvider";
import MemberProvider from "@/contexts/member";
import ModalProvider from "@/contexts/modal";
import CafeProvider from "@/contexts/cafe";

export default function App({Component, pageProps}: AppProps) {
  return (
    <>
      <SeoHead/>
      <ChakraProvider resetCSS={true} theme={theme}>
        <Global styles={globalStyle}/>
        <GlobalProvider contexts={[MemberProvider, ModalProvider, CafeProvider]}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </GlobalProvider>
      </ChakraProvider>
    </>
  );
}
