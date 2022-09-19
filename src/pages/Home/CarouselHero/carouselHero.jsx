import bg from '../img/bg.jpg';
import bg2 from '../img/bg-2.jpg';
import Carousel from 'nuka-carousel/lib/carousel';
import './carouselHero.scss';
import 'animate.css';

export const CarouselHero = () => {
    return (
        <Carousel
            wrapAround={true}
            autoplay={true}
            dragThreshold={.2}
            speed={2000}
            className={"carousel-slider"}
            pauseOnHover={false}
            adaptiveHeight={false}
        >
            <div className="hs-item" style={{ backgroundImage: `url("${bg}")` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-7 text-white">
                            <span className='animate__animated animate__fadeInUp'>New Arrivals</span>
                            <h2 className='animate__animated animate__fadeInUp'>denim jackets</h2>
                            <p className='animate__animated animate__fadeInUp'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                            </p>
                            <div className="site-btn sb-line animate__animated animate__fadeInUp">DISCOVER</div>
                            <div className="site-btn sb-white animate__animated animate__fadeInUp">ADD TO CART</div>
                        </div>
                    </div>
                    <div className="offer-card text-white">
                        <span>from</span>
                        <h2>$29</h2>
                        <p className='shop-now'>SHOP NOW</p>
                    </div>
                </div>
            </div>

            <div className="hs-item" style={{ backgroundImage: `url("${bg2}")` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-7 text-white">
                            <span>New Arrivals</span>
                            <h2>denim jackets</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. </p>
                            <div className="site-btn sb-line">DISCOVER</div>
                            <div className="site-btn sb-white">ADD TO CART</div>
                        </div>
                    </div>
                    <div className="offer-card text-white">
                        <span>from</span>
                        <h2>$29</h2>
                        <p>SHOP NOW</p>
                    </div>
                </div>
            </div>
        </Carousel>
    )
}