import he from 'he';
import Head from 'next/head';
import Image from 'next/image';
import NextLink from 'next/link';
import hydrate from 'next-mdx-remote/hydrate';
import { useRouter } from 'next/router';
import { getSingleBlog, getBlogSlugs } from '@/lib/data';
import renderToString from 'next-mdx-remote/render-to-string';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { Box, Button, Heading, Link } from '@chakra-ui/react';
import { CMStitle} from "../../constants/index";
const MyBlog = ({ singleBlog, content }) => {
  const router = useRouter();
  if (router.isFallback) return <>Loading...</>;

  return (
    <div>
      <Head>
        <title>  {singleBlog.blogs[0].title} | {CMStitle}</title>
        <meta name="description" content={singleBlog.blogs[0].subheading} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main class="container z-30  opacity-100 max-w-4xl mx-auto px-4 mb-20">
     
     <div>

       <div class="sm:-mx-5 md:-mx-10 lg:-mx-20 xl:-mx-38 mb-5">
<img
 class="rounded-lg aspect-video	"
 src={singleBlog.blogs[0].bannerImage.url}
 alt={singleBlog.blogs[0].title}
  
/>
</div>

<h1 class="text-4xl font-semibold mb-5"> {singleBlog.blogs[0].title}</h1>


<div class="mb-5 flex justify-between">
    <div>
    {singleBlog.blogs[0].tags.map((item, index) => (
       <div  key={index}>
         <div class=' flex flex-wrap'> <span         class="flex flex-wrap p-1 m-1 px-4 justify-between items-center text-sm font-medium rounded-xl cursor-pointer bg-purple-500 text-gray-200 hover:bg-purple-600 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100">
        {item}</span></div>
       </div>
     ))}

    </div>
    </div>

{new Date(singleBlog.blogs[0].date).toDateString()}
 
<div
class="mb-5 prose py-3 flex prose-a:text-primary hover:prose-a:text-primary-focus"
> 
<br/>

<div class=" bg-black w-[100%] text-[#ffffff] rounded-xl p-2 "> 
<article class="prose prose-xl">
{hydrate(content)} </article>
</div>





 
     </div>
   </div>
 </main>
</div>
  
  );
};

export default MyBlog;

export const getStaticProps = async ({ params }) => {
  const singleBlog = await getSingleBlog(params.slug);
  return {
    props: {
      singleBlog,
      content: await renderToString(he.decode(singleBlog.blogs[0].content))
    }
  };
};

export const getStaticPaths = async () => {
  const blogSlugs = await getBlogSlugs();
  const slugPaths = blogSlugs.blogs.map(slug => ({
    params: { slug: slug.slug }
  }));
  return {
    paths: slugPaths,
    fallback: true
  };
};
