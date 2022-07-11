import PropTypes from 'prop-types';

import { useAddReactionMutation } from '../features/posts/postsSlice';

const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '💖',
  rocket: '🚀',
  coffee: '☕',
};

const ReactionButtons = ({ post }) => {
  const [addReaction] = useAddReactionMutation();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => (
    <button
      key={name}
      type='button'
      onClick={() => {
        const newValue = post.reactions[name] + 1;
        addReaction({
          postId: post.id,
          reactions: { ...post.reactions, [name]: newValue },
        });
      }}
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
