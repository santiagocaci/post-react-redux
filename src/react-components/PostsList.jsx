import { useDispatch, useSelector } from 'react-redux';
import { deletePost, selectAllPosts } from '../features/posts/postsSlice';
import PostAuthor from './PostAuthor';
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';

const PostsList = () => {
  const posts = useSelector(selectAllPosts);
  const dispatch = useDispatch();

  const onClickDelete = (postId) => {
    dispatch(deletePost(postId));
  };

  const renderedPosts = posts.map((post) => (
    <article
      key={post.id}
      className='flex flex-col bg-teal-600 p-4 rounded border-2 relative'
    >
      <h3 className='text-2xl pb-2 font-semibold'>{post.title}</h3>
      <hr className='pb-2' />
      <p className='text-lg flex-1'>{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
      <button
        onClick={() => onClickDelete(post.id)}
        className='absolute -top-2.5 -right-2 bg-red-500 rounded-full px-2 py-0 font-semibold'
      >
        X
      </button>{' '}
      <PostAuthor userId={post.userId} />
      <TimeAgo timestamp={post.date} />
    </article>
  ));

  return (
    <section className='max-w-6xl w-4/5 my-2 mb-4'>
      <h2 className='text-3xl font-bold mb-2'>Posts</h2>
      <div className='grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3'>
        {renderedPosts}
      </div>
    </section>
  );
};

export default PostsList;
