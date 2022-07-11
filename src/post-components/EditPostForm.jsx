import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { selectAllUsers } from '../features/users/usersSlices';
import {
  useUpdatePostMutation,
  // useDeletePostMutation,
  selectPostById,
} from '../features/posts/postsSlice';

const EditPostForm = () => {
  const [updatePost, { isLoading }] = useUpdatePostMutation();
  // const [deletePost] = useDeletePostMutation();

  const { postId } = useParams();
  const navigate = useNavigate();

  const post = useSelector((state) => selectPostById(state, Number(postId)));

  const users = useSelector(selectAllUsers);

  const [stateForm, setStateForm] = useState({
    title: post?.title,
    content: post?.body,
  });

  if (!post) {
    <section>
      <h2>Post Not Found!</h2>
    </section>;
  }

  const [userId, setUserId] = useState(post?.userId);

  const canSave =
    [stateForm.title, stateForm.content, userId].every(Boolean) && !isLoading;

  const onInputChange = (e) => {
    const { value, name } = e.target;
    setStateForm({
      ...stateForm,
      [name]: value,
    });
  };

  const onAuthorChange = (e) => setUserId(Number(e.target.value));

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (canSave) {
      try {
        await updatePost({
          id: post.id,
          title: stateForm.title,
          body: stateForm.content,
          userId,
          reactions: post.reactions,
        }).unwrap();
        setStateForm({ title: '', content: '' });
        setUserId('');
        navigate(`/post/${postId}`);
      } catch (error) {
        console.error('Failed to save the post', error);
      }
    }
  };

  const usersOptions = users.map((user) => (
    <option
      key={user.id}
      value={user.id}
      className='text-teal-700 font-semibold'
    >
      {user.name}
    </option>
  ));

  // console.log('render');
  // const onDeletePostClick = async () => {
  //   try {
  //     console.log(post);
  //     await deletePost({ id: post.id }).unwrap();
  //     setStateForm({
  //       title: '',
  //       content: '',
  //     });
  //     setUserId('');
  //     navigate('/');
  //   } catch (error) {
  //     console.error('Failed to delete the post', error);
  //   }
  // };

  return (
    <section className='w-4/5 max-w-screen-md my-2'>
      <h2 className='text-3xl font-bold pb-2 underline-offset-4'>Edit Post</h2>
      <form onSubmit={onFormSubmit}>
        <label
          htmlFor='title'
          className='block text-2xl p-2 px-0 font-semibold'
        >
          Post Title:
        </label>
        <input
          type='text'
          name='title'
          id='title'
          value={stateForm.title}
          onChange={onInputChange}
          className='w-full bg-teal-700 rounded-sm p-1 pl-2'
        />
        <label
          htmlFor='content'
          className='block text-2xl p-2 px-0 font-semibold'
        >
          Content:
        </label>
        <textarea
          name='content'
          id='content'
          value={stateForm.content}
          onChange={onInputChange}
          className='w-full bg-teal-700 rounded-sm p-1 pl-2'
        />
        <label
          htmlFor='postAuthor'
          className='text-2xl p-2 px-0 font-semibold mr-2'
        >
          Author:
        </label>
        <select
          name={userId}
          id='postAuthor'
          onChange={onAuthorChange}
          defaultValue={userId}
          className='text-teal-700 font-semibold px-2 py-1 rounded-sm'
        >
          <option value=''></option>
          {usersOptions}
        </select>
        {/* <button
          type='submit'
          className='block text-lg font-semibold bg-teal-600 px-2 py-1 rounded hover:bg-teal-700 mt-3 disabled:bg-slate-500'
          disabled={!canSave}
        >
          Save Post
        </button>
        <button onClick={onDeletePostClick}>Delete Post</button> */}
      </form>
    </section>
  );
};

export default EditPostForm;
