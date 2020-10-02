import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Box, Flex } from "rebass";
import styled from "@emotion/styled";

export function Logo() {
  return (
    <Box as={"span"} fontSize={30} color="#1F282F">
      Rasha Rahman
    </Box>
  );
}

export default function Header({ headlines, setGenreSelection }) {
  const HeaderStyled = styled.div`
    a {
      text-decoration: none;
      color: unset;
    }

    a:hover {
      color: navy;
    }
  `;
  var rand = headlines && Math.round(Math.random() * headlines.length);
  rand && headlines[rand] && console.log(rand, headlines[rand]);
  const router = useRouter();

  const [firstTime, setFirstTime] = useState(
    typeof window !== "undefined" && localStorage.getItem("firstTime")
      ? localStorage.getItem("firstTime")
      : null
  );
  const [likeCount, setLikeInc] = useState(10);
  const handleClick = () => {
    if (!firstTime || firstTime === null) {
      setFirstTime(true);
      localStorage.setItem("firstTime", true);
      setLikeInc(likeCount + 1);
    }
    if (firstTime) {
      setFirstTime(null);
      localStorage.setItem("firstTime", false);
      setLikeInc(likeCount - 1);
    }
  };

  return (
    <Flex
    width={['25vw','25vw','unset']}
    my={1}
    p={1}
    color={"rgb(5, 104, 143)"}
    sx={{
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "600",
    }}  
    justifyContent="center"

    mr={3}
    >
      <Box alignItems="center">
        <Box
          onClick={() => {
            setGenreSelection && setGenreSelection("resume");
            setGenreSelection
              ? router.push("/?p=resume", "/")
              : router.push("/");
          }}
        >
          <Logo />
        </Box>

        {router && router.query.slug && (
          <Flex
          width="100%"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            textAlign="center"
          >
            <Box width={2/5} onClick={() => router.back()}>
              Go Back
            </Box>
          <Box  width={1/5} >

          </Box>
            <Box  width={2/5} >
              <HeaderStyled>
                <a
                  href="https://twitter.com/share?ref_src=twsrc%5Etfw"
                  className="twitter-share-button"
                  data-text="I love this project on rasha.world!"
                  data-via="raaahhh_sha"
                  data-show-count="false"
                >
                  Share This
                </a>
                <script
                  async
                  src="https://platform.twitter.com/widgets.js"
                  charset="utf-8"
                ></script>
              </HeaderStyled>
            </Box>
          </Flex>
        )}
      </Box>
    </Flex>
  );
}
