import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectPostById } from '../features/posts/postsSlice';

import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

const SinglePostPage = () => {
  const { postId } = useParams();

  const post = useSelector((state) => selectPostById(state, Number(postId))); //! Number(postId)

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <article className='max-w-4xl w-4/5 flex flex-col bg-teal-600 p-4 rounded border-2 relative mt-5'>
      <h3 className='text-2xl pb-2 font-semibold'>{post.title}</h3>
      <hr className='pb-2' />
      <p className='text-lg flex-1'>{post.body}</p>
      <Link
        className='underline underline-offset-1'
        to={`/post/edit/${post.id}`}
      >
        Edit post
      </Link>
      <ReactionButtons post={post} />
      <PostAuthor userId={post.userId} />
      <TimeAgo timestamp={post.date} />
    </article>
  );
};

export default SinglePostPage;
