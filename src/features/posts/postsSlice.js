import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

const initialState = [
  {
    id: '1',
    title: 'Aprendiendo redux toolkit',
    content:
      'Esse occaecat do elit incididunt nulla esse qui dolor deserunt quis culpa laboris aute minim.',
    userId: '1',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffe: 0,
    },
  },
  {
    id: '2',
    title: 'Aprendiendo con Dave Gray',
    content: 'Cupidatat sint quis ullamco do ex dolor ut sit.',
    userId: '2',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffe: 0,
    },
  },
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      reducer(state, action) {
        state.unshift(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffe: 0,
            },
          },
        };
      },
    },
    deletePost: {
      reducer(state, action) {
        const postId = action.payload;
        const postFind = state.find((post) => post.id === postId);
        if (postFind) state = state.splice(state.indexOf(postFind), 1);
      },
    },
    addReaction: {
      reducer(state, action) {
        const { postId, reaction } = action.payload;
        const existingPost = state.find((post) => post.id === postId);
        if (existingPost) existingPost.reactions[reaction]++;
      },
    },
  },
});

export const selectAllPosts = (state) => state.posts;

export const { addPost, deletePost, addReaction } = postsSlice.actions;

export default postsSlice.reducer;
