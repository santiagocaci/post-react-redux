import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div className='h-screen'>
      <Header />
      <main className='h-full pt-24 flex flex-col items-center bg-teal-800 text-white overflow-auto'>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
