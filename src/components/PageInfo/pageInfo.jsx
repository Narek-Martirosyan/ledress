import './pageInfo.scss';
import { Link } from 'react-router-dom';

export const PageInfo = () => {
    return (
        <div className="page-top-info">
            <div className="container">
                <h4>Products Page</h4>
                <div className="site-pagination">
                    <Link to="">Home</Link> /
                    <Link to="">Shop</Link> /
                </div>
            </div>
        </div>
    )
}