import { Link } from "react-router-dom"
import { icons } from "../../icons"
import './footer.scss';
import cards from './img/cards.png';

export const Footer = () => {
    return (
        <section className="footer-section">
            <div className="container">
                <div className="footer-logo text-center">
                    <Link to="index.html"><img src="./img/logo-light.png" alt="" /></Link>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-sm-6">
                        <div className="footer-widget about-widget">
                            <h2>About</h2>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus consectetur ipsam, sequi totam magni molestias repudiandae ut explicabo. Earum totam dolor reiciendis tenetur quia eos. Facilis voluptatum consequuntur fugit ex, earum quod, veritatis incidunt molestiae quibusdam magnam doloremque nostrum aliquid.
                            </p>
                            <img src={cards} alt="cards" />
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <div className="footer-widget about-widget">
                            <h2>Questions</h2>
                            <ul>
                                <li><Link to="">About Us</Link></li>
                                <li><Link to="">Track Orders</Link></li>
                                <li><Link to="">Returns</Link></li>
                                <li><Link to="">Jobs</Link></li>
                                <li><Link to="">Shipping</Link></li>
                                <li><Link to="">Blog</Link></li>
                            </ul>
                            <ul>
                                <li><Link to="">Partners</Link></li>
                                <li><Link to="">Bloggers</Link></li>
                                <li><Link to="">Support</Link></li>
                                <li><Link to="">Terms of Use</Link></li>
                                <li><Link to="">Press</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <div className="footer-widget contact-widget">
                            <h2>Contact</h2>
                            <div className="con-info">
                                <span>C.</span>
                                <p>Your Company Ltd </p>
                            </div>
                            <div className="con-info">
                                <span>B.</span>
                                <p>1481 Creekside Lane  Avila Beach, CA 93424, P.O. BOX 68 </p>
                            </div>
                            <div className="con-info">
                                <span>T.</span>
                                <p>+53 345 7953 32453</p>
                            </div>
                            <div className="con-info">
                                <span>E.</span>
                                <p>office@youremail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="social-links-warp">
                <div className="container">
                    <div className="social-links">
                        <a href="https://instagram.com" className="instagram"><i>{icons.instagram}</i><span>instagram</span></a>
                        <a href="https://pinterest.com" className="pinterest"><i>{icons.pinterest}</i><span>pinterest</span></a>
                        <a href="https://facebook.com" className="facebook"><i>{icons.facebook}</i><span>facebook</span></a>
                        <a href="https://twitter.com" className="twitter"><i>{icons.twitter}</i><span>twitter</span></a>
                        <a href="https://youtube.com" className="youtube"><i>{icons.youtube}</i><span>youtube</span></a>
                    </div>
                </div>
            </div>
        </section>
    )
}