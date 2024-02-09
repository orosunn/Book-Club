import { NavLink, useLocation } from 'react-router-dom';

function NavBar() {
  const getClassName = ({ isActive }) => isActive ? "item active" : "item";
  return (
    <div className="ui brown three item menu">
      <NavLink exact to="/" className={getClassName} end>
        Home
      </NavLink>
      <NavLink to="/books" className={getClassName}end>
        Books
      </NavLink>
      <NavLink to="/discussion" className={getClassName}>
        Discussion
      </NavLink>
    </div>
  );
}


export default NavBar;

