import { NavLink } from "react-router-dom";

export default function Header(props) {
  return (
    <div className='header-wrapper'>
      <NavLink className='header' to={props.route}>{props.route === 'posts/new' ? 'Create' : 'Back'}</NavLink>
    </div>
  )
}