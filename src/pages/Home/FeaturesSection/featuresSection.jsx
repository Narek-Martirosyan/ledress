import './featuresSection.scss';
import one from './img/1.png';
import two from './img/2.png';
import three from './img/3.png';

export const FeaturesSection = () => {
    return (
        <section className="features-section">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4 p-0 feature">
                        <div className="feature-inner">
                            <div className="feature-icon">
                                <img src={one} alt="one" />
                            </div>
                            <h2>Fast Secure Payments</h2>
                        </div>
                    </div>
                    <div className="col-md-4 p-0 feature">
                        <div className="feature-inner">
                            <div className="feature-icon">
                                <img src={two} alt="two" />
                            </div>
                            <h2>Premium Products</h2>
                        </div>
                    </div>
                    <div className="col-md-4 p-0 feature">
                        <div className="feature-inner">
                            <div className="feature-icon">
                                <img src={three} alt="three" />
                            </div>
                            <h2>Free & fast Delivery</h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
