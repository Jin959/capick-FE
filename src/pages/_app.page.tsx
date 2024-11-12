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
import {NextComponentType, NextPage} from "next";
import LoadingSpinnerModal from "@/components/common/modal/LoadingSpinnerModal";

interface CustomAppProps extends AppProps {
  Component: NextComponentType & NextPageWithCafeContext
}

type NextPageWithCafeContext = NextPage & {
  requireCafeContext: boolean;
}

export default function App({Component, pageProps}: CustomAppProps) {

  const contexts = [MemberProvider, ModalProvider];
  if (Component.requireCafeContext) {
    contexts.push(CafeProvider);
  }

  return (
    <>
      <SeoHead/>
      <ChakraProvider resetCSS={true} theme={theme}>
        <Global styles={globalStyle}/>
        <GlobalProvider contexts={contexts}>
          <Layout>
            <LoadingSpinnerModal/>
            <Component {...pageProps} />
          </Layout>
        </GlobalProvider>
      </ChakraProvider>
    </>
  );
}
