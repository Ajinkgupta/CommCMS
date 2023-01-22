import { useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import useSWR from 'swr';
import { request } from 'graphql-request';
import { api_endpoint } from '@/constants/index';
import { Button, Box, Stack, Link, Heading } from '@chakra-ui/react';
import { CMStitle} from "../constants/index";
import { HiArrowNarrowRight, HiArrowNarrowLeft } from 'react-icons/hi';
import styles from '@/styles/Home.module.css';
import Image from 'next/image';

const fetchData = (endpoint, query, variables) =>
  request(endpoint, query, variables);

const MyBlogs = ({ blogs }) => {
  const [skip, setSkip] = useState(0);
  const { data, error } = useSWR(
    [
      api_endpoint,
      `    query getPaginatedBlog($skip: Int) {
        blogsConnection(orderBy: updatedAt_DESC, first: 5, skip: $skip) {
          edges {
            node {
              title
              date
              tags
              slug
              content
              bannerImage {
                url
                width
                height
              }
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            pageSize
          }
        }
      }
  `,
      skip
    ],
    (endpoint, query) => fetchData(endpoint, query, { skip }),
    { initialData: blogs, revalidateOnFocus: true }
  );

  return (
    <div className={styles.container}>
      <Head>
        <title> Blogs  | {CMStitle}</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className='text-6xl text-center pt-3 font-extrabold'>Blogs</h1>

<br/>
         <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-12 place-items-center ">
{data?.blogsConnection?.edges.map((item, index) => (         
     <div key={index}>   
              <NextLink href={`/blog/${item.node.slug}`} passHref>
                
                <Link>
                <div class=" bg-ram shadow-xl w-72  rounded-md"> 
      <div class="flex justify-center items-center leading-none">
      <Link>   <img
        src={item.node.bannerImage.url}
        class="h-40 w-[250px] rounded-md shadow-2xl mt-6 transform -translate-y-10 hover:-translate-y-4 transition duration-700"
      /></Link>
    </div>  
    <div class="p-3">
      <Link> 
     <p class="block mb-1 font-bold">  {item.node.title}</p> </Link> <br/>
     <Link>  <p class="text-xs tracking-tighter ">
     {item.node.subheading}
      </p> </Link>
      {new Date(item.node.date).toDateString()}

    </div>
      </div>
               
                </Link>
              </NextLink>
           </div>

          ))} </div>

       <br/> 









         
        <div>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Button
              leftIcon={<HiArrowNarrowLeft />}
              colorScheme="green"
              variant="outline"
              mr="2"
              disabled={!data?.blogsConnection?.pageInfo?.hasPreviousPage}
              onClick={() => {
                setSkip(skip - 5);
              }}
            >
              Previous
            </Button>
            <Button
              rightIcon={<HiArrowNarrowRight />}
              colorScheme="green"
              variant="outline"
              ml="2"
              disabled={!data?.blogsConnection?.pageInfo?.hasNextPage}
              onClick={() => {
                setSkip(skip + 5);
              }}
            >
              Next
            </Button>
          </Box>

          <Box mt={7}>
            Total Pages:{data?.blogsConnection.pageInfo.pageSize}
          </Box>
        </div>
        {error && <div>Failed to load</div>}
      





 
    </div>
  );
};

export default MyBlogs;

export const getStaticProps = async () => {
  const data = await fetchData(
    api_endpoint,
    `
    query getPaginatedBlog {
      blogsConnection(orderBy: updatedAt_DESC, first: 6, skip: 0) {
        edges {
          node {
            title
            date
            tags 
            slug
            content
            bannerImage {
              url
              width
              height
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage 
          pageSize
        }
      }
    }
`
  );

  return {
    props: {
      blogs: data
    }
  };
};
