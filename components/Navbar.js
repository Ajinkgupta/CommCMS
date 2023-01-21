import NextLink from 'next/link';
import { CMStitle ,CMSurl} from "../constants/index";

const Navbar = () => {
  return (
    <>
  <nav class=" sticky  top-2 px-2 z-50 ">
  <div class=" w-full rounded-2xl bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 p-1 ">
  
    <header class=" rounded-xl	 z-30 w-full px-2 py-2 bg-[#1F1D2B] sm:px-4 shadow-xl">
    <div class="flex items-center justify-between mx-auto max-w-7xl">
    <NextLink href={`/`} passHref>
        <span class="text-2xl font-extrabold text-white">{CMStitle}</span>
      </NextLink>
      <div class="flex items-center space-x-1">
   
        <div class="inline-flex">
        <NextLink href={`/events`} passHref>
          <button class="flex-none font-extrabold	 px-6 py-2 text-black rounded-xl bg-gradient-to-r from-yellow-500 via-red-500 to-blue-500 ">
          Events
          </button>
          </NextLink>
        </div>
      </div>
    </div>
  </header>
   
</div>
  </nav>
    </>
  );
};

export default Navbar;
