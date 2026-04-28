import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Footer = () =>
{
    useEffect( () =>
    {
        // Prevent duplicate script injection
        if ( document.getElementById( 'eh-form-script' ) )
        {
            if ( window.EhAPI )
            {
                window.EhAPI.after_load = function ()
                {
                    window.EhAPI.set_account( 'hedd10f6tqki3gqusm6u26s89p', 'interbizconsulting' );
                    window.EhAPI.execute( 'rules' );
                };
            }
            return;
        }

        window.EhAPI = window.EhAPI || {};
        window.EhAPI.after_load = function ()
        {
            window.EhAPI.set_account( 'hedd10f6tqki3gqusm6u26s89p', 'interbizconsulting' );
            window.EhAPI.execute( 'rules' );
        };

        const script = document.createElement( 'script' );
        script.id = 'eh-form-script';
        script.type = 'text/javascript';
        script.async = true;
        script.src = `//d2p078bqz5urf7.cloudfront.net/jsapi/ehform.js?v${ new Date().getHours() }`;
        document.body.appendChild( script );
    }, [] );

    return (
        <footer>
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-about">
                        <div className="footer-logo">
                            <img src="/assets/footerF.png" alt="EstiPay" style={ { width: '40%' } } />
                        </div>
                        <p className="footer-tagline">AI that chases carriers so your team doesn't have to.</p>
                        <div className="footer-socials">
                            <a href="https://x.com/EstipayAi" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="X (Twitter)"><i className="fa-brands fa-x-twitter"></i></a>
                            <a href="https://www.instagram.com/estipay.ai/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
                            <a href="https://www.facebook.com/profile.php?id=61585284686591#" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="https://www.linkedin.com/company/110638934/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                        </div>
                    </div>

                    <div className="footer-links">
                        <h4>Company</h4>
                        <ul>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h4>Product</h4>
                        <ul>
                            <li><Link to="/product">Product</Link></li>
                            <li><Link to="/solutions">Solutions</Link></li>
                            <li><Link to="/security">Security</Link></li>
                        </ul>
                    </div>

                    <div className="footer-newsletter">
                        <h4>Stay up to date</h4>
                        <p>Get product updates and news straight to your inbox.</p>
                            <div
                                className="engage-hub-form-embed"
                                id="eh_form_6529917257515008"
                                data-id="6529917257515008"
                            ></div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-copyright">© 2026 EstiPay Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;