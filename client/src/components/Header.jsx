import Navbar from './Navbar';

export default function Header() {
  return (
    <>
    <header className="header">
        <h1 className="title"><img className="logo" src="\BookNook-logos_transparent.png"></img></h1>
        <div className="header-links">
        <a className="login" href='/login'>Login</a>
        <a className="signup" href='/signup'>Sign Up</a>
        </div>
    </header>
    <Navbar />
    </>
  );
}
