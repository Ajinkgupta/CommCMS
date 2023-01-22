import Head from 'next/head';
import NextLink from 'next/link';
import Image from 'next/image';
import { getEvents } from '@/lib/data';
import { CMStitle} from "../constants/index";
import styles from '@/styles/Home.module.css';
import { Box, Link, Stack, Heading, Text } from '@chakra-ui/react';

const MyEvents = ({ data }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Events | {CMStitle}</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='h-[100vh] px-3'>
        <div>
        <h1 className='text-6xl text-center pt-3 font-extrabold'> Events</h1>
     <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-12 place-items-center ">
          {data?.events?.map((item, index) => (
            <>
             <div key={index}>   
              <NextLink href={`/event/${item.slug}`} passHref>
                
                <Link>
                <div class=" bg-ram shadow-xl w-72  rounded-md"> 
      <div class="flex justify-center items-center leading-none">
      <Link>   <img
        src={item.bannerImage.url}
        class="h-40 w-[250px] rounded-md shadow-2xl mt-6 transform -translate-y-10 hover:-translate-y-4 transition duration-700"
      /></Link>
    </div>  
    <div class="p-3">
      <Link> 
     <p class="block mb-1 font-bold">  {item.title}</p> </Link> <br/>
     <Link>  <p class="text-xs tracking-tighter ">
     {item.subheading}
      </p> </Link>
     
    </div>
      </div>
               
                </Link>
              </NextLink>
           </div>
            
            </>
          ))} </div>
        </div>
      </main>
    </div>
  );
};

export default MyEvents;

export const getStaticProps = async () => {
  const data = await getEvents();
  return {
    props: {
     data
    }
  };
};
