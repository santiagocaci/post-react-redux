import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAllUsers } from '../features/users/usersSlices';

const PostAuthor = ({ userId }) => {
  const users = useSelector(selectAllUsers);
  const author = users.find((user) => user.id === userId);

  return (
    <span className='absolute -top-2 left-2 bg-yellow-600 px-2 rounded'>
      By:{' '}
      {author ? <Link to={`/user/${userId}`}>{author.name}</Link> : '???????'}
    </span>
  );
};

PostAuthor.propTypes = {
  userId: PropTypes.number,
};

export default PostAuthor;
