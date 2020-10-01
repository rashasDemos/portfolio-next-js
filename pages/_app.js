import Index from ".";
import { Box, Flex } from "rebass";
import Header from "../components/Header";
import styled from "@emotion/styled";
import {DefaultSeo} from 'next-seo'

export default function MyApp({ Component, pageProps }) {
  const GlobalStyled = styled.div`
    text-transform: lowercase;
    color: #1F282F;
  `;
  return (
    <GlobalStyled>
          <DefaultSeo
          openGraph={{
            type: 'website',
            locale: 'en_IE',
            url: 'https://www.rasha.world/',
            site_name: 'Rasha Rahman',
          }}
          twitter={{
            handle: '@raaahhh_sha',
            site: '@raaahhh_sha',
            cardType: 'summary_large_image',
          }}
        />
      <Flex
        sx={{
          minHeight: "98vh",
          justifyContent: "center",
          textAlign: "left",
        }}
      >
        <Box>
          <Component {...pageProps} />
        </Box>
      </Flex>
    </GlobalStyled>
  );
}
