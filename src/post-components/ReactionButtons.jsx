import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addReaction } from '../features/posts/postsSlice';

const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '💖',
  rocket: '🚀',
  coffee: '☕',
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => (
    <button
      key={name}
      type='button'
      onClick={() => dispatch(addReaction({ postId: post.id, reaction: name }))}
      className='pr-1 py-0.5 transition active:scale-125'
    >
      {emoji} {post.reactions[name]}
    </button>
  ));

  return <div className='space-x-1'>{reactionButtons}</div>;
};

ReactionButtons.propTypes = {
  post: PropTypes.object,
};

export default ReactionButtons;
