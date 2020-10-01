import Index from ".";
import { Box, Flex } from "rebass";
import Header from "../components/Header";
import styled from "@emotion/styled";

export default function MyApp({ Component, pageProps }) {
  const GlobalStyled = styled.div`
    text-transform: lowercase;
    color: #1F282F;
  `;
  return (
    <GlobalStyled>
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
