import Index from ".";
import { Box, Flex } from "rebass";
import Header from "../components/Header";
import styled from "@emotion/styled";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "emotion-theming";
import theme from "../components/theme/theme.js";

export default function MyApp({ Component, pageProps }) {
  const GlobalStyled = styled.div`
  @import url('https://rsms.me/inter/inter.css');
html { font-family: 'Inter', sans-serif; }
@supports (font-variation-settings: normal) {
  html { font-family: 'Inter var', sans-serif; }
}
  font-family: 'Inter', sans-serif;
    text-transform: lowercase;
    color: #1f282f;
  `;
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyled>
        <DefaultSeo
          openGraph={{
            type: "website",
            locale: "en_IE",
            url: "https://www.rasha.world/",
            site_name: "Rasha Rahman",
          }}
          twitter={{
            handle: "@raaahhh_sha",
            site: "@raaahhh_sha",
            cardType: "summary_large_image",
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
    </ThemeProvider>
  );
}
