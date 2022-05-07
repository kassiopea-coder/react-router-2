import { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import Header from './Header';

export default function PostEdit() {
  const { id } = useParams();
  const [form, setForm] = useState({content: ''});

  useEffect(() => {
    getPost()
  }, [])

  const getPost = () => {
    fetch(`http://localhost:7777/posts/${id}`)
    .then((response) => response.json())
    .then(data => setForm(data));
  }

  const toPost = (form) => {
    console.log(form)
    const formData = new FormData();
    formData.append('id', id);
    formData.append('content', form.content);

    fetch('http://localhost:7777/posts', {
      method: 'POST',
      body: new URLSearchParams(formData)
    });

    document.location = `/posts/${id}`;
  }

  const onChangeHandler = ({ target: { value } }) => {
    setForm(prev => ({...prev, content: value}));
  }

  return (
    <div className='container'>
      <Header route={'/'}></Header>
      <form className='new-post-wrapper' onSubmit={(e) => {
        e.preventDefault();
        toPost(form);
      }}>
      <NavLink className='new-post-close' to='/posts/:id'>x</NavLink>
      <input className='new-post-text' 
             type="text" 
             placeholder={form.content}
             value={form.content}
             onChange={onChangeHandler}
            />
      <button className='new-post-button'>Post</button>
      </form>
    </div>     
  )
}