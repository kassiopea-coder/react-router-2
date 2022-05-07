import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function NewPost() {
  const [form, setForm] = useState({content: ''});

  const toPost = (form) => {
    const formData = new FormData();
    formData.append('content', form.content);

    fetch('http://localhost:7777/posts', {
      method: 'POST',
      body: new URLSearchParams(formData)
    });

    document.location = "/";
  }

  const onChangeHandler = ({ target: { value } }) => {
    setForm(prev => ({...prev, content: value}));
  }

  return (
    <form className='new-post-wrapper' onSubmit={(e) => {
      e.preventDefault();
      toPost(form);
    }}>
      <NavLink className='new-post-close' to='/'>x</NavLink>
      <input className='new-post-text' 
             type="text" 
             placeholder='type here...'
             value={form.content}
             onChange={onChangeHandler}/>
      <button className='new-post-button'>Post</button>
    </form>
  )
}