import { useSelector } from 'react-redux';
import {
  selectPostIds,
  getPostsError,
  getPostsStatus,
} from '../features/posts/postsSlice';
import PostItem from './PostItem';

const PostsList = () => {
  const orderedPostIds = useSelector(selectPostIds);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  let content;
  if (postStatus === 'loading') {
    content = <p>&ldquo; Loading... &ldquo;</p>;
  } else if (postStatus === 'succeeded') {
    content = orderedPostIds.map((postId) => {
      return <PostItem key={postId} postId={postId} />;
    });
  } else if (postStatus === 'failed') {
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
