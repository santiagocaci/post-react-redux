import { useSelector } from 'react-redux';
import { selectUserById } from './usersSlices';
import { selectPostsByUser } from '../posts/postsSlice';
import { Link, useParams } from 'react-router-dom';

const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));

  const postForUser = useSelector((state) =>
    selectPostsByUser(state, Number(userId))
  );

  const postTitles = postForUser.map((post) => (
    <li key={post.id} className=' bg-teal-600 p-4 rounded border-2'>
      <Link to={`/post/${post.id}`} className='text-xl pb-2 font-semibold'>
        {post.title}
      </Link>
    </li>
  ));
  return (
    <section className='w-4/5 py-4'>
      <h2 className='text-3xl font-bold mb-2'>{user?.name}</h2>
      <ol className='flex flex-col gap-2'>{postTitles}</ol>
    </section>
  );
};

export default UserPage;
