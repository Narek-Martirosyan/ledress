import './home.scss';
import { CarouselHero } from './CarouselHero';
import { FeaturesSection } from './FeaturesSection';
import { LatestProducts } from './LatestProducts';
import { ProductFilterSection } from './ProductFilterSection';
import { Banner } from './Banner';
import { getProducts } from '../../api/product_API';
import { useEffect, useState } from 'react';

export const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts().then(res => {
            setProducts(res.data.products);
        });
    }, []);

    return (
        <section className="hero-section">
            <CarouselHero />
            <FeaturesSection />
            <LatestProducts products={products.slice(0, 20)} title={"LATEST PRODUCTS"} />
            <ProductFilterSection products={products} />
            <Banner />
        </section>
    )
}