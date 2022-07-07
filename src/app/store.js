import { configureStore } from '@reduxjs/toolkit';
import postsSlice from '../features/posts/postsSlice';
import usersSlices from '../features/users/usersSlices';

export const store = configureStore({
  reducer: {
    posts: postsSlice,
    users: usersSlices,
  },
});
