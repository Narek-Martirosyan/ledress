import './banner.scss';
import { Link } from 'react-router-dom';

export const Banner = () => {
    return (
        <section className="banner-section">
            <div className="container">
                <div className="banner set-bg">
                    <div className="tag-new">NEW</div>
                    <span>New Arrivals</span>
                    <h2>STRIPED SHIRTS</h2>
                    <Link to="/products" className="site-btn">SHOP NOW</Link>
                </div>
            </div>
        </section>
    )
}