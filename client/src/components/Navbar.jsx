import { Link, useLocation } from 'react-router-dom';

function NavBar() {
  const currentPage = useLocation().pathname;

  return (
    <ul>
      <li className="nav-item">
        <Link
          to="/"
          // Check to see if the currentPage is `About`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
          className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
        >
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/books"
          className={currentPage === '/portfolio' ? 'nav-link active' : 'nav-link'}
        >
            Books
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/meetup"
          className={currentPage === '/resume' ? 'nav-link active' : 'nav-link'}
        >
          Meetup
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/login"
          className={currentPage === '/contact' ? 'nav-link active' : 'nav-link'}
        >
          Login
        </Link>
      </li>
    </ul>
  );
}

export default NavBar;
