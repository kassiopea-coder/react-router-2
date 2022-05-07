/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import { useParams, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from "./Header";

export default function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState([]);

  useEffect(() => {
    getPost()
  }, [])

  const getPost = () => {
    fetch(`http://localhost:7777/posts/${id}`)
    .then((response) => response.json())
    .then(data => setPost(data));
  }

  const timeNow = moment();
  const timeCreated = moment(post.created);
  const time = timeCreated.from(timeNow);


  const onDelete = (id) => {
    fetch(`http://localhost:7777/posts/${id}`, {
      method: 'DELETE',
      body: id
    });
    document.location = "/";
  }

  return (
    <div className='container'>
      <Header route={'/'}></Header>
      <div className='post-wrapper'>
        <div className='post-body'>
          <div className='post-header'>
            <div className='post-time'>Posted {time}</div>
            <NavLink className='post-edit' to={document.location.pathname+'/edit'} id={id} content={post.content}>Edit</NavLink>
            <div className='post-delete' onClick={(e) => {
              e.preventDefault();
              onDelete(id)
            }}>x</div>
          </div> 
          <div className='post-content'>{post.content}</div>
        </div>
      </div>
    </div> 
  )
}