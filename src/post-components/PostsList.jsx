import { useSelector } from 'react-redux';
import { useGetPostsQuery, selectPostIds } from '../features/posts/postsSlice';
import PostItem from './PostItem';

const PostsList = () => {
  const { isError, isLoading, isSuccess, error } = useGetPostsQuery();
  const orderedPostIds = useSelector(selectPostIds);

  let content;
  if (isLoading) {
    content = <p>&ldquo; Loading... &ldquo;</p>;
  } else if (isSuccess) {
    content = orderedPostIds.map((postId) => {
      return <PostItem key={postId} postId={postId} />;
    });
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <section className='max-w-6xl w-4/5 my-2 mb-4'>
      <h2 className='text-3xl font-bold mb-2'>Posts</h2>
      <div className='grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3'>
        {content}
      </div>
    </section>
  );
};

export default PostsList;
