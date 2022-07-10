import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import {
  deletePost,
  selectPostById,
  updatePost,
} from '../features/posts/postsSlice';
import { selectAllUsers } from '../features/users/usersSlices';

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const post = useSelector((state) => selectPostById(state, Number(postId))); //! Number(postId)

  const users = useSelector(selectAllUsers);

  if (!post) {
    <section>
      <h2>Post Not Found!</h2>
    </section>;
  }

  const [stateForm, setStateForm] = useState({
    title: post.title,
    content: post.body,
  });
  const [userId, setUserId] = useState(post.userId);
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const canSave =
    [stateForm.title, stateForm.content, userId].every(Boolean) &&
    addRequestStatus === 'idle';

  const onInputChange = (e) => {
    const { value, name } = e.target;
    setStateForm({
      ...stateForm,
      [name]: value,
    });
  };

  const onAuthorChange = (e) => setUserId(Number(e.target.value));

  const onFormSubmit = (e) => {
    e.preventDefault();

    // dispatch(addPost(stateForm.title, stateForm.content, userId));
    // setStateForm({ title: '', content: '' });

    if (canSave) {
      try {
        setAddRequestStatus('pending');
        dispatch(
          updatePost({
            id: post.id,
            title: stateForm.title,
            body: stateForm.content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();
        setStateForm({ title: '', content: '' });
        setUserId('');
        navigate(`/post/${postId}`);
      } catch (error) {
        console.error('Failed to save the post', error);
      } finally {
        setAddRequestStatus('idle');
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

  const onDeletePostClick = () => {
    try {
      setAddRequestStatus('pending');
      dispatch(deletePost({ id: post.id })).unwrap();

      setStateForm({
        title: '',
        content: '',
      });
      setUserId('');
      navigate('/');
    } catch (error) {
      console.error('Failed to delete the post', error);
    } finally {
      setAddRequestStatus('idle');
    }
  };

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
        <button
          type='submit'
          className='block text-lg font-semibold bg-teal-600 px-2 py-1 rounded hover:bg-teal-700 mt-3 disabled:bg-slate-500'
          disabled={!canSave}
        >
          Save Post
        </button>
        <button onClick={onDeletePostClick}>Delete Post</button>
      </form>
    </section>
  );
};

export default EditPostForm;
