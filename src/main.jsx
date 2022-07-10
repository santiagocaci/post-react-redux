import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { fetchUsers } from './features/users/usersSlices';
import { store } from './app/store';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import './index.css';
import { fetchPosts } from './features/posts/postsSlice';

store.dispatch(fetchPosts());
store.dispatch(fetchUsers());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
