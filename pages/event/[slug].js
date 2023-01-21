import Head from 'next/head';
import Image from 'next/image';
import he from 'he';
import hydrate from 'next-mdx-remote/hydrate';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { getSingleEvent, getEventSlugs } from '@/lib/data';
import renderToString from 'next-mdx-remote/render-to-string';
import { Box, Button, Heading, Link } from '@chakra-ui/react';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { CMStitle} from "../../constants/index";
const MyEvent = ({ singleEvent, content }) => {
  const router = useRouter();
  if (router.isFallback) return <>Loading...</>;
  return (
    <div>
      <Head>
        <title> {singleEvent.events[0].title} | {CMStitle}</title>
        <meta name="description" content={singleEvent.events[0].subheading} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main class="container z-30  opacity-100 max-w-4xl mx-auto px-4 mb-20">
     
          <div>
 
            <div class="sm:-mx-5 md:-mx-10 lg:-mx-20 xl:-mx-38 mb-5">
    <img
      class="rounded-lg aspect-video	"
      src={singleEvent.events[0].bannerImage.url}
      alt={singleEvent.events[0].title}
       
    />
  </div>
  
  <h1 class="text-4xl font-semibold mb-5"> {singleEvent.events[0].title}</h1>
  
  <a href= {singleEvent.events[0].register} ><button type="button" class="rounded  border-indigo-500     inline-block px-6 py-2.5 bg-[#f6ff00]  text-black font-bold text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">Register</button></a>
 
  <div
    class="mb-5 prose py-3 flex prose-a:text-primary hover:prose-a:text-primary-focus"
  > 
 <br/>

  <div class=" bg-black w-[100%] text-[#ffffff] rounded-xl p-2 "> 
  <article class="prose prose-xl">
    {hydrate(content)}
  </article>
</div>





           
           

            
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyEvent;

export const getStaticProps = async ({ params }) => {
  const singleEvent = await getSingleEvent(params.slug);
  return {
    props: {
      singleEvent,
      content: await renderToString(
        he.decode(singleEvent.events[0].content)
      )
    }
  };
};

export const getStaticPaths = async () => {
  const eventSlugs = await getEventSlugs();
  const slugPaths = eventSlugs.events.map(slug => ({
    params: { slug: slug.slug }
  }));
  return {
    paths: slugPaths,
    fallback: true
  };
};
