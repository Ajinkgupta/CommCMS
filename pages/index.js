import Head from 'next/head';
import NextLink from 'next/link';
import Image from 'next/image';
import { getBlogsAndEvents } from '@/lib/data';
import animation from '../public/animation.gif'
import { Box, Heading, Text, Button, Stack, Link } from '@chakra-ui/react';
import styles from '@/styles/Home.module.css';
import { CMStitle, CMSdescription, LOGOCMS} from "../constants/index";

const Home = ({ data }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{CMStitle}</title>
        <meta name="description" content={CMSdescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>




      <div className='text-center z bg-fixed bg-cover bg-[url("https://mir-s3-cdn-cf.behance.net/project_modules/fs/712cd661356955.5a6b8679a39e7.gif")] h-[100vh]'>

<div className=" py-20 ">
<img className="mx-auto h-[200px] border-2 rounded-lg" src={LOGOCMS} />

</div>
<h1 className='text-6xl font-extrabold'> {CMStitle}</h1>
</div>

{/* hero Ended here*/}


<div className="  px-10">
 
<h2 className='text-6xl text-center font-extrabold'> Events</h2>

<br/>
 <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-12 place-items-center ">
{data?.events?.map((item, index) => (
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

          ))}</div>

       <br/> 


          <NextLink href={`/events`} passHref>
          <button class="flex-none items-center	 font-extrabold	 px-6 py-2 text-black rounded-xl bg-gradient-to-r from-yellow-500 via-red-500 to-blue-500 ">
          View All Events
          </button>
          </NextLink>
          <div className="center_gradient"/>
 <div className="blue_gradient"/>
</div>


{/* Event Ended here*/}

<div className=" px-10">
 
<h2 className='text-6xl text-center font-extrabold'>Blogs</h2>

<br/> 
 <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-12 place-items-center ">

{data?.blogs?.map((item, index) => (
            <div key={index}>   
              <NextLink href={`/blog/${item.slug}`} passHref>
                
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

          ))}
</div>
       <br/> 


          <NextLink href={`/blogs`} passHref>
          <button class="flex-none items-center	 font-extrabold	 px-6 py-2 text-black rounded-xl bg-gradient-to-r from-yellow-500 via-red-500 to-blue-500 ">
       Explore Blogs
          </button>
          </NextLink>
         
</div>


 
 
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  const data = await getBlogsAndEvents();
  return {
    props: {
      data
    }
  };
};
