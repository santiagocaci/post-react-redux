import PropTypes from 'prop-types';
import { formatDistanceToNow, parseISO } from 'date-fns';

const TimeAgo = ({ timestamp }) => {
  let timeAgo = '';
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }
  return (
    <span
      title={timestamp}
      className='absolute -bottom-3 left-2 bg-yellow-600 pr-2 rounded'
    >
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};

TimeAgo.propTypes = {
  timestamp: PropTypes.any,
};

export default TimeAgo;
