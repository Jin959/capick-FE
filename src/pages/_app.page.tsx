import {ChakraProvider} from "@chakra-ui/react";
import type {AppProps} from "next/app";
import {Global} from "@emotion/react";
import theme from "@/styles/theme";
import globalStyle from "@/styles/global";
import Layout from "@/components/common/Layout";
import MemberProvider from "@/contexts/member";
import SeoHead from "@/components/common/SeoHead";

export default function App({Component, pageProps}: AppProps) {
  return (
    <>
      <SeoHead/>
      <ChakraProvider resetCSS={true} theme={theme}>
        <Global styles={globalStyle}/>
        <MemberProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MemberProvider>
      </ChakraProvider>
    </>
  );
}
