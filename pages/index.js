import Head from "next/head";
import { useContext, useEffect, createContext, useState, memo } from "react";
import { useQuery } from "react-query";
import { Box, Flex } from "rebass";
import fetch from "isomorphic-unfetch";
import Header from "../components/Header";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { NextSeo } from 'next-seo'

export default function Index() {
  var rooter = useRouter();
  useEffect(() => {
    console.log(rooter);
  }, [rooter.query.p]);
  if (rooter.asPath) {
    return (
      <MenuProvider root={rooter}>
        
        <HomePage />
      </MenuProvider>
    );
  }
  return <>uhh</>;
}
const MenuContext = createContext();

// export const rooter = memo(async() => {
//   const {setGenreSelection} = useContext(MenuContext)
//   const root = await useRouter()
//   console.log(root)
//   setGenreSelection(root.query.p)

//   return root;
// })

const MenuProvider = ({ children, root }) => {
  const defaultState = "resume";
  const [selectedGenres, setGenreSelection] = useState(
    root.asPath === "/"
      ? "resume"
      : root.asPath.substring(4, root.asPath.length)
  );
  return (
    <MenuContext.Provider
      value={{ selectedGenres, setGenreSelection, defaultState }}
    >
      {children}
    </MenuContext.Provider>
  );
};

const HomePage = memo(() => {
  //memo used to only change HomePage render when states change
  const { selectedGenres, setGenreSelection, defaultState } = useContext(
    MenuContext
  );
  const socialLinks = [
    {
      id: "1",
      title: "email",
      url: "mailto:rasha.r.rahman@gmail.com",
    },
    {
      id: "2",
      title: "Twitter",
      url: "https://www.twitter.com/raaahhh_sha",
    },
    {
      id: "3",
      title: "Github",
      url: "https://github.com/rashasDemos",
    },
  ];
  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
        <NextSeo
      title={selectedGenres === 'projects' ? `Rasha's ` + selectedGenres[0].toUpperCase() + selectedGenres.substring(1,selectedGenres.length): `Rasha's World`}
      description="This is resume and portfolio website for Rasha Rahman who is a front end web developer from Los Angeles."
      canonical="https://www.rasha.world/"
      openGraph={{
        url: 'https://www.rasha.world',
        title: selectedGenres === 'projects' ? `Rasha's ` + selectedGenres[0].toUpperCase() + selectedGenres.substring(1,selectedGenres.length): `Rasha's World`,
        description: 'This is resume and portfolio website for Rasha Rahman who is a front end web developer from Los Angeles.',
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
      <div className="container">
        {/* <Head>
       <title>Create Next App</title>
       <link rel="icon" href="/favicon.ico" />
       </Head> */}
        <Box>
          <Flex justifyContent="space-between" alignItems="center">
            <Header setGenreSelection={setGenreSelection} />
            <GenreSelector />
          </Flex>
          <Flex>
            <Box as="sub" pl={1} mx={2.5} mt={0}>
              Front End Developer With A Psych Degree
            </Box>
          </Flex>
          <Flex>
            <Box mx={2.5} mt={3} mb={1}>
              <Flex justifyContent="space-between" alignItems="center">
                {socialLinks.map((x) => (
                  <Box
                    backgroundColor={"#1F282F"}
                    
                    onClick={() => window.location.assign(x.url)}
                    sx={{
                      borderRadius: 5,
                      ":hover": {
                        color: "lightblue",
                        cursor: "pointer",
                      },
                    }}
                    color={"white"}
                    p={[0.5,1]}
                    
                    mr={2}
                    as='h6'
                  >
                    {x.title}
                  </Box>
                ))}
                <Box mr={2} as="h3" fontSize={['1em','0.7em','1em','1em','1em']}>
                  - Based in Los Angeles - Currently @ UCLA
                </Box>
               
              </Flex>
            </Box>
          </Flex>
          <Box pl={2}>---</Box>
        </Box>
        <Flex px={40}>
          <GenresSelected />
        </Flex>
        <style jsx>{`
          .container {
            padding: 1rem 0.5rem;
            justify-content: center;
            display: flex;
            flex-direction: column;
            max-width: 960px;
          }

          main {
            padding: 5rem 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          footer {
            width: 100%;
            height: 100px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          footer img {
            margin-left: 0.5rem;
          }

          footer a {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          .title a {
            color: #0070f3;
            text-decoration: none;
          }

          .title a:hover,
          .title a:focus,
          .title a:active {
            text-decoration: underline;
          }

          .title {
            margin: 0;
            line-height: 1.15;
            font-size: 4rem;
          }

          .title,
          .description {
            text-align: center;
          }

          .description {
            line-height: 1.5;
            font-size: 1.5rem;
          }

          code {
            background: #fafafa;
            border-radius: 5px;
            padding: 0.75rem;
            font-size: 1.1rem;
            font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
              DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
          }

          .grid {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;

            max-width: 800px;
            margin-top: 3rem;
          }

          .card {
            margin: 1rem;
            flex-basis: 45%;
            padding: 1.5rem;
            text-align: left;
            color: inherit;
            text-decoration: none;
            border: 1px solid #eaeaea;
            border-radius: 10px;
            transition: color 0.15s ease, border-color 0.15s ease;
          }

          .card:hover,
          .card:focus,
          .card:active {
            color: #0070f3;
            border-color: #0070f3;
          }

          .card h3 {
            margin: 0 0 1rem 0;
            font-size: 1.5rem;
          }

          .card p {
            margin: 0;
            font-size: 1.25rem;
            line-height: 1.5;
          }

          .logo {
            height: 1em;
          }

          @media (max-width: 600px) {
            .grid {
              width: 100%;
              flex-direction: column;
            }
          }
        `}</style>
        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            min-height: 98vh;
            background-image: url("${process.env.domain + `so-white.png`}");
            background-repeat: repeat;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }

          * {
            box-sizing: border-box;
          }
        `}</style>
      </div>
    </Box>
  );
});
function GenresSelected() {
  const { selectedGenres, defaultState } = useContext(MenuContext);
  const router = useRouter();
  const [genreSet, setGenreSet] = useState();
  const [checked, setCheck] = useState([]);

  const [searchedData, setSearchedData] = useState();

  const InputStyled = styled.div`
    text-decoration: none;
  `;
  const filteredArray = ["music"];
  const filteredData = null;

  const { data, isLoading, error } = useQuery([selectedGenres], fetchPage);
  if (isLoading)
    return (
      <Flex flexDirection="row">
        <Box
          as="img"
          sx={{
            filter: "invert(1) hue-rotate(-90deg)",
          }}
          src={`https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2F62U9Iw4Kmvgl2%2Fgiphy.gif&f=1&nofb=1`}
          width="30px"
        />
        <Box as={"h5"}>
          the
          {selectedGenres && " " + selectedGenres.toLowerCase()} page is loading{" "}
        </Box>
      </Flex>
    );
  if (error)
    return (
      <Box as={"h5"}>
        awkward... the {selectedGenres && selectedGenres.toLowerCase()} page
        cannot be loaded, try again later
      </Box>
    );

  const handleSearch = (val) => {
    setSearchedData(
      data.filter((x) => {
        if (
          (x.headline || x.desc || x.longDesc)
            .toUpperCase()
            .includes(val.toUpperCase())
        ) {
          return true;
        }
        if (val === "undefined") {
          return true;
        }
        return false;
      })
    );
  };
  const handleToggle = (val) => {
    const currentIndex = checked.indexOf(val);
    const newIndex = [...checked];

    currentIndex === -1 ? newIndex.push(val) : newIndex.splice(currentIndex, 1);
    setCheck(newIndex);
    console.log(val, currentIndex, checked);
  };

  switch (selectedGenres && selectedGenres) {
    case "resume":
      var pageData = (
        <Box>
          <Box my={10} as={"h1"}>
            My Education
          </Box>
          <Flex>
            {data &&
              data[0].Education.map((x) => (
                <Box as={"h3"} key={x.id}>
                  <Flex as="ul" flexDirection="column">
                    <Box my={1}>
                      {" "}
                      <Box
                        sx={{
                          fontWeight: "bolder",
                        }}
                      >
                        School
                      </Box>{" "}
                      {x.schoolName}
                    </Box>
                    <Box my={1}>
                      {" "}
                      <Box
                        sx={{
                          fontWeight: "bolder",
                        }}
                      >
                        Degree
                      </Box>{" "}
                      {x.major}
                    </Box>
                    <Box my={1}>
                      {" "}
                      <Box
                        sx={{
                          fontWeight: "bolder",
                        }}
                      >
                        Time Spent
                      </Box>{" "}
                      {x.timeSpent}
                    </Box>
                  </Flex>{" "}
                </Box>
              ))}
          </Flex>
          <Box my={10} as={"h1"}>
            My Skills
          </Box>
          <Flex>
            {data &&
              data[0].Skillset.map((x) => (
                <Box as={"h3"} key={x.id}>
                  <Flex as="ul" flexDirection="column">
                    <Box my={1}>
                      {" "}
                      <Box
                        sx={{
                          fontWeight: "bolder",
                        }}
                      >
                        Field
                      </Box>{" "}
                      {x.field}
                    </Box>
                    <Box my={1}>
                      {" "}
                      <Box
                        sx={{
                          fontWeight: "bolder",
                        }}
                      >
                        Subfield
                      </Box>{" "}
                      {x.subfields}
                    </Box>
                    <Box my={1}>
                      {" "}
                      <Box
                        sx={{
                          fontWeight: "bolder",
                        }}
                      >
                        Experience
                      </Box>{" "}
                      {x.experience}
                    </Box>
                    <Box my={1}>
                      <Box
                        sx={{
                          fontWeight: "bolder",
                        }}
                      >
                        Tools
                      </Box>
                      {x.tools}
                    </Box>
                  </Flex>{" "}
                </Box>
              ))}
          </Flex>
          <Box my={10} as={"h1"}>
            My Previous Work
          </Box>
          <Flex>
            {data &&
              data[0].Work.map((x) => (
                <Box as={"h3"} key={x.id}>
                  <Flex as="ul" flexDirection="column">
                    <Box my={1}>
                      {" "}
                      <Box
                        sx={{
                          fontWeight: "bolder",
                        }}
                      >
                        Company
                      </Box>{" "}
                      {x.company}
                    </Box>
                    <Box my={1}>
                      {" "}
                      <Box
                        sx={{
                          fontWeight: "bolder",
                        }}
                      >
                        Job Title
                      </Box>{" "}
                      {x.jobTitle}
                    </Box>
                    <Box my={1}>
                      {" "}
                      <Box
                        sx={{
                          fontWeight: "bolder",
                        }}
                      >
                        Time Spent
                      </Box>{" "}
                      {x.timeSpent}
                    </Box>
                    <Box my={1}>
                      <Box
                        sx={{
                          fontWeight: "bolder",
                        }}
                      >
                        Description
                      </Box>
                      {x.mainDesc}
                    </Box>
                    <Box my={1}>
                      <Box
                        sx={{
                          fontWeight: "bolder",
                        }}
                      >
                        {x.Responsibilities[0] && "Responsibilities"}
                      </Box>
                      <ul style={{
                        listStyleType: 'square'          
                      }}>
                        {x.Responsibilities.map((y) => (
                          <li key={y.id}>{y.task}</li>
                        ))}
                      </ul>
                    </Box>
                  </Flex>{" "}
                </Box>
              ))}
          </Flex>
        </Box>
      );
      return pageData;
    case "projects":
      pageData = (
        <Flex flexDirection={['column','row','row']}>
          <Flex mr={75} sx={{
            display: ['none', 'none', 'unset']
          }} flexDirection="column">
            {" "}
            <Box my={10} mt={3} as={"h1"}>
              Projects
            </Box>
            <Box my={10} as={"h5"}>
              <label>
                Search
                <input
                  onChange={(e) => handleSearch(e.target.value)}
                  type="text"
                ></input>
              </label>
            </Box>
            <Box>
              {" "}
              <Box
                mt={3}
                mb={1}
                fontWeight="600"
                sx={{
                  textDecoration: "underline",
                  textUnderlinePosition: "from-font",
                }}
                as="pre"
              >
                Category
              </Box>
              {data && (
                <form>
                  <Flex flexDirection="column">
                    {[...new Set(data.map((x) => x.genre.slug))].map((x, i) => (
                      <label key={i} style={{ fontSize: "0.7em" }}>
                        <input
                          name={x}
                          type="checkbox"
                          onChange={(e) => handleToggle(x)}
                          checked={checked.indexOf(x) === -1 ? false : true}
                        />
                        {x}
                      </label>
                    ))}
                  </Flex>
                </form>
              )}
            </Box>
          </Flex>

          <Box width={960}>
            <Flex flexDirection="column">
              {(searchedData ? searchedData : data && data)
                .filter(function (x) {
                  for (var key in checked) {
                    console.log("TEST", x[key], checked[key]);
                    if (
                      x.genre.slug === undefined ||
                      !checked.includes(x.genre.slug)
                    ) {
                      return false;
                    }
                  }
                  return true;
                })
                .map((x, i) => (
                  <Box
                    as={"h3"}
                    key={x.id}
                    my={3}
                    sx={{
                      borderRadius: 10,
                      backgroundColor: i % 2 === 0 ? "#78909C10" : "#CFD8DC15",
                    }}
                  >
                    <Flex as="ul" flexDirection="column">
                      <Link
                        key={i}
                        {...(router.asPath === "/?p=projects" && "prefetch")}
                        href="project/[slug].js"
                        as={`project/${x.slug}`}
                      >
                        <InputStyled key={i}>
                          <a>
                            {" "}
                            <Box
                              sx={{
                                textDecoration: "underline",
                                ":hover": {
                                  backgroundColor: "#1F282F",
                                  color: "gold",
                                  width: "50%",
                                  cursor: "pointer",
                                },
                              }}
                              as="h1"
                              my={1}
                            >
                              {x.headline}
                            </Box>
                          </a>
                        </InputStyled>
                      </Link>
                      <Box my={1} ml={10}>
                        {" "}
                        <Box
                          sx={{
                            fontWeight: "bolder",
                          }}
                        >
                          Type
                        </Box>{" "}
                        {x.genre.label.toUpperCase()}
                      </Box>
                      <Box my={1} ml={10}>
                        {" "}
                        <Box
                          sx={{
                            fontWeight: "bolder",
                          }}
                        >
                          Description
                        </Box>{" "}
                        {x.desc.toUpperCase()}
                      </Box>

                      <Box my={1} ml={10}>
                        {" "}
                        {x.sourceURL && (
                          <Box
                            sx={{
                              fontWeight: "bolder",
                            }}
                          >
                            See In Action
                          </Box>
                        )}{" "}
                      </Box>
                    </Flex>{" "}
                  </Box>
                ))}
            </Flex>
          </Box>
        </Flex>
      );
      return pageData;
    case DEFAULT:
      return <Box>Nothing To Show</Box>;
  }

  return pageData;
}

async function fetchPage(selectedGenres) {
  const res = await fetch(`${process.env.domain + `@api/${selectedGenres}.json`}`);
  const data = await res.json();
  return data;
}

function GenreSelector() {
  const { selectedGenres, setGenreSelection, defaultState } = useContext(
    MenuContext
  );

  const router = useRouter();
  const arr = [
    { name: "Resume", slug: "resume" },
    { name: "Projects", slug: "projects" },
  ];
  const arrmap = arr.map((x, i) => (
    <option key={i} value={x.slug} label={`> ` + x.name.toLowerCase()}></option>
  ));
  const filteredarrmap = arr
    .filter((x, i) => i >= 0)
    .map((x, i) => (
      <option
        key={i}
        value={x.slug}
        label={`> ` + x.name.toLowerCase()}
      ></option>
    ));

  function handleChange(e) {
    setGenreSelection(e.target.value);
    router.push("/#" + e.target.value, {
      query: { p: e.target.value },
      shallow: true,
    });
  }
  return (
    <Flex>
      <select
        style={{
          cursor: "pointer",
          width: "200px",
          height: "80%",
          color: "white",
          padding: "5px 10px",
          display: "flex",
          justifyItems: "center",
          alignItems: "center",
          fontSize: "1em",
          fontWeight: "bolder",
          textAlign: "center",
          border: "1px solid #1F282F",
          borderRadius: "10px",

          appearance: "none",
          backgroundColor: "#20272F",
        }}
        value={selectedGenres}
        onChange={(e) =>
          e.target.value !== arr[0]
            ? // ?
              handleChange(e)
            : setGenreSelection(defaultState)
        }
      >
        {selectedGenres === defaultState ? filteredarrmap : filteredarrmap}
      </select>
    </Flex>
  );
}
