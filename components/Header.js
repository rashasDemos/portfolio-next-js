import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Box, Flex } from "rebass";

export function Logo() {
  return (
    <Box as={"span"} fontSize={30} color="#1F282F">
      Rasha's World
    </Box>
  );
}

export default function Header({ headlines, setGenreSelection }) {
  var rand = headlines && Math.round(Math.random() * headlines.length);
  rand && headlines[rand] && console.log(rand, headlines[rand])
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
      my={1}
      p={1}
      color={"rgb(5, 104, 143)"}
      sx={{
        textAlign: "center",
        borderRadius: "10px",
        cursor: "pointer",
        fontWeight: "600",
      }}
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      mr={3}
    >
      <Box flexDirection="row" alignItems="center" maxWidth={640}>
        <Box onClick={() => {
          setGenreSelection('resume')
          router.push('/?p=resume', '/')
          }} >
        <Logo />
        </Box>

        {router && router.query.slug && (
          <Flex
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
          >
            <Box onClick={() => router.back()} mx={2}>
              Go Back
            </Box>

            <Link
              href={`/project/[slug].js`}
              as={`/project/${headlines[rand ? rand : 0]}`}
            >
              <a>
                <Box mx={2}>Shuffle Project</Box>
              </a>
            </Link>
          </Flex>
        )}
      </Box>
    </Flex>
  );
}
