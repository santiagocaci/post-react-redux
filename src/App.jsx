import AddPostsForm from './react-components/AddPostsForm';
import PostsList from './react-components/PostsList';

function App() {
  return (
    <div className='pt-5 h-screen flex flex-col items-center bg-teal-800 text-white overflow-auto'>
      <AddPostsForm />

      <PostsList />
    </div>
  );
}

export default App;
