import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AddPostsForm from './post-components/AddPostsForm';
import PostsList from './post-components/PostsList';
import SinglePostPage from './post-components/SinglePostPage';
import EditPostForm from './post-components/EditPostForm';
import UserList from './features/users/UserList';
import UserPage from './features/users/UserPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<PostsList />} />

        <Route path='post'>
          <Route index element={<AddPostsForm />} />
          <Route path=':postId' element={<SinglePostPage />} />
          <Route path='edit/:postId' element={<EditPostForm />} />
        </Route>

        <Route path='user'>
          <Route index element={<UserList />} />
          <Route path=':userId' element={<UserPage />} />
        </Route>

        <Route path='*' element={<Navigate to='/' replace />} />
      </Route>
    </Routes>
  );
}

export default App;
