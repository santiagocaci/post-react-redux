import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='w-full h-24 mx-auto px-3 fixed z-[1] bg-white  md:h-16'>
      <div className='h-full flex items-center justify-between max-w-5xl mx-auto'>
        <h1 className='text-3xl font-bold'>Redux Blog</h1>
        <nav>
          <ul className='flex gap-x-3 text-lg font-semibold '>
            <li>
              <Link className='px-1 py-2' to='/'>
                Home
              </Link>
            </li>
            <li>
              <Link className='px-1 py-0.5' to='post'>
                Post
              </Link>
            </li>
            <li>
              <Link className='px-1 py-0.5' to='user'>
                Users
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
