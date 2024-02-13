import Navbar from './Navbar';
import Auth from '../utils/auth'

export default function Header() {
  return (
    <>
    <header className="header">
        <h1><img className="logo" src="\BookNook-logos_transparent.png"></img></h1>
        <div className="header-links">
          {Auth.loggedIn()? <button onClick={()=> Auth.logout()}className="header-btn"><a className="logout" >Logout</a></button>: <>
          <button className="header-btn"><a className="login" href='/login'>Login</a></button>
        <button className="header-btn"><a className="signup" href='/signup'>Sign Up</a></button>
          </>}
        </div>
    </header>
    <Navbar />
    </>
  );
}
