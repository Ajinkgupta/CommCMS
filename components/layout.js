import Navbar from '@/components/navbar';
import Footer from './footer';

export default function Layout({ children }) {
  return (
    <div className='bg-gray-800'>

      <Navbar />
      <main>{children}</main>
      <Footer />
 
    </div>
 

  );
}
