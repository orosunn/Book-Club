import Contact from './Contact'

const Footer = () => {

    return (
        <footer id="footer">
            <div className="footer-element">
                <div id="contact-link">
                    <a href='/contact'>Contact us</a>
                </div>
                <div>
                    <img id="footer-logo" src="/BookNook-logos_transparent.png"></img>
                </div>

            </div>
            <Contact />
        </footer>
    );
};

export default Footer;