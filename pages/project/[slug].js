import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { Box } from "rebass";
import ReactMarkdown from "react-markdown";
import Header from "../../components/Header";
import { NextSeo } from 'next-seo'
import fetch from 'isomorphic-unfetch'

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
        <NextSeo
      title={filterData ? `"` + filterData[0].headline.toUpperCase() + `"` + " by Rasha" : 'Projects'}
      description={"Rasha Rahman's Project Desc: " + filterData[0].desc}
      canonical="https://www.rasha.world/"
      openGraph={{
        url: 'https://www.rasha.world',
        title: `"` + router.query.slug + `"` + " by Rasha" ,
        description: "Rasha Rahman's Project Desc: " + filterData[0].desc,
        // images: [
        //   {
        //     url: 'https://www.example.ie/og-image-01.jpg',
        //     width: 800,
        //     height: 600,
        //     alt: 'Og Image Alt',
        //   },
        //   {
        //     url: 'https://www.example.ie/og-image-02.jpg',
        //     width: 900,
        //     height: 800,
        //     alt: 'Og Image Alt Second',
        //   },
        //   { url: 'https://www.example.ie/og-image-03.jpg' },
        //   { url: 'https://www.example.ie/og-image-04.jpg' },
        // ],
        site_name: 'Rasha.World',
      }}
    />
    
      <Box mt={3} width={4 / 16}>
        <Header headlines={headlines} currentSlug={filterData.slug} />
      </Box>
      <Box
        width={9 / 16}
        mt={46}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
          <img src={process.env.domain + 'images/' + filterData[0].displayImage.name} key={filterData[0].headline} width="100%" style={{
              borderRadius: 10
          }} />
      </Box>
      <Box
        width={10 / 16}
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
        <Box as="ul" mb={3}>
         Tech Used:
         {filterData[0].technologies.map((x,i) => <li key={i}>{x.Title}</li>)}
        </Box>
      </Box>

    </Box>
  );
};

export default MainProjectWindow;

export async function getStaticPaths(context) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`${process.env.projects + 'projects.json'}`);
  const post = await res.json();
  const paths = post.map((post) => `/project/${post.slug}`);

  // Pass post data to the page via props
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  // params contains the post `id`.
  console.log("x", context);
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`${process.env.projects + 'projects.json'}`);
  const post = await res.json();

  // Pass post data to the page via props
  return { props: { post } };
}
