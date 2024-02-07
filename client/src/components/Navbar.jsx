import { Link, useLocation } from 'react-router-dom';

function NavBar() {
  const currentPage = useLocation().pathname;

  return (
    <ul className="ui three item menu">
    <li className="item">
      <Link
        to="/"
        className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
      >
        Home
      </Link>
    </li>
    <li className="item">
      <Link
        to="/books"
        className={currentPage === '/books' ? 'nav-link active' : 'nav-link'}
      >
          Books
      </Link>
    </li>
    <li className="item">
      <Link
        to="/meetings"
        className={currentPage === '/meetings' ? 'nav-link active' : 'nav-link'}
      >
        Upcoming Meetings
      </Link>
    </li>
  </ul>
  
  );
}

export default NavBar;


