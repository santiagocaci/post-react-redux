import { useSelector } from 'react-redux';
import { selectAllUsers } from './usersSlices';
import { Link } from 'react-router-dom';

const UserList = () => {
  const users = useSelector(selectAllUsers);

  const renderedUsers = users.map((user) => (
    <li key={user.id} className='text-2xl'>
      <Link to={`/user/${user.id}`}>{user.name}</Link>
    </li>
  ));

  return (
    <section className='py-4'>
      <h2 className='text-3xl font-bold mb-2'>Users</h2>
      <ul className='h-full flex flex-col gap-y-4 justify-around '>
        {renderedUsers}
      </ul>
    </section>
  );
};

export default UserList;
