import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { Box } from "rebass";
import ReactMarkdown from "react-markdown";
import Header from "../../components/Header";

const MainProjectWindow = ({ post }) => {
  const router = useRouter();
  console.log(post);
  //   const { data, isLoading, error } = useQuery([router.query.slug], getStaticPaths);
  const filterData = post
    ? post.filter((x) => x.slug === router.query.slug)
    : null;
  const headlines = post ? post.map((a, i) => a.slug) : null;
  //   if (isLoading) return <Box>loading</Box>;
  //   if (error) return <Box>oh no</Box>;
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box width={4 / 16}>
        <Header headlines={headlines} currentSlug={filterData.slug} />
      </Box>
      <Box
        width={7 / 16}
        mt={46}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            textDecoration: "underline",
          }}
          as="h1"
        >
          {filterData[0].headline}
        </Box>
        <Box
          sx={{
            fontStyle: "italic",
          }}
          as="h3"
        >
          {filterData[0].desc}
        </Box>
        <Box>
          <ReactMarkdown source={filterData[0].longDesc} />
        </Box>
      </Box>
      <Box
        width={5 / 16}
        mt={46}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        s
      </Box>
    </Box>
  );
};

export default MainProjectWindow;

export async function getStaticPaths(context) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`http://localhost:3000/@api/projects.json`);
  const post = await res.json();
  const paths = post.map((post) => `/project/${post.slug}`);

  // Pass post data to the page via props
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  // params contains the post `id`.
  console.log("x", context);
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`http://localhost:3000/@api/projects.json`);
  const post = await res.json();

  // Pass post data to the page via props
  return { props: { post } };
}
