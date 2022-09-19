import './quantity.scss';
import { useState } from 'react';

export const Quantity = () => {
    let [quantity, setQuantity] = useState(1);

    return (
        <div className="quantity">
            <p>Quantity</p>
            <div className="pro-qty">
                <span className='qtybtn' onClick={() => {
                    if (quantity === 1) {
                        quantity = 1;
                    } else {
                        setQuantity(quantity - 1);
                    }

                }}>-</span>
                <span>{quantity}</span>
                <span className='qtybtn' onClick={() => setQuantity(quantity + 1)}>+</span>
            </div>
        </div>
    )
}