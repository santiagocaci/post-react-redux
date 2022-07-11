import { useSelector } from 'react-redux';
import { selectUserById } from './usersSlices';
import { Link, useParams } from 'react-router-dom';
import { useGetPostsByUserIdQuery } from '../posts/postsSlice';

const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));

  const {
    data: postsForUser,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetPostsByUserIdQuery(userId);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    const { ids, entities } = postsForUser;
    content = ids.map((id) => (
      <li key={id}>
        <Link to={`/post/${id}`}>{entities[id].title}</Link>
      </li>
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <section className='w-4/5 py-4'>
      <h2 className='text-3xl font-bold mb-2'>{user?.name}</h2>
      <ol className='flex flex-col gap-2'>{content}</ol>
    </section>
  );
};

export default UserPage;
