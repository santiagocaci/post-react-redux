import PropTypes from 'prop-types';

import { useSelector } from 'react-redux/es/exports';
import { selectPostById } from '../features/posts/postsSlice';
import { Link } from 'react-router-dom';

import PostAuthor from './PostAuthor';
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';

const PostItem = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId));

  return (
    <article className='flex flex-col bg-teal-600 p-4 rounded border-2 relative'>
      <h3 className='text-2xl pb-2 font-semibold'>{post.title}</h3>
      <hr className='pb-2' />

      <p className='text-lg flex-1'>{post.body}</p>

      <Link to={`post/${post.id}`} className='underline underline-offset-2'>
        View Post
      </Link>
      <ReactionButtons post={post} />
      <PostAuthor userId={post.userId} />
      <TimeAgo timestamp={post.date} />
    </article>
  );
};

PostItem.propTypes = {
  postId: PropTypes.number,
};

export default PostItem;
