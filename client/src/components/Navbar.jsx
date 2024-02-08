import { NavLink, useLocation } from 'react-router-dom';

function NavBar() {
  return (
    <div className="ui brown three item menu">
      <NavLink exact to="/" activeClassName="active" className="item">
        Home
      </NavLink>
      <NavLink to="/books" activeClassName="active" className="item">
        Books
      </NavLink>
      <NavLink to="/discussion" activeClassName="active" className="item">
        Discussion
      </NavLink>
    </div>
  );
}


export default NavBar;

