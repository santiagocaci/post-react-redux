import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlices';
import usersSlices from '../features/users/usersSlices';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    users: usersSlices,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
