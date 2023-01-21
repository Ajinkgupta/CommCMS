import { CMStitle ,CMSurl} from "../constants/index";
import NextLink from 'next/link';

const Footer = () => {
  return (
    <>
    
<footer class="p-4  shadow md:flex md:items-center md:justify-between md:p-6 bg-gray-800">
    <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <NextLink href={CMSurl} class="hover:underline">{CMStitle}</NextLink>. All Rights Reserved.
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
            <a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
        </li>
        <li>
            <a href="#" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
        </li>
        <li>
            <a href="#" class="mr-4 hover:underline md:mr-6">Licensing</a>
        </li>
        <li>
            <a href="#" class="hover:underline">Contact</a>
        </li>
    </ul>
</footer>
   
    </>
  );
};

export default Footer;
