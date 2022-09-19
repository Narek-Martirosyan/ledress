import './priceRange.scss';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';
import { useEffect } from 'react';

export const PriceRange = ({ prices, getValue }) => {
    const [value, setValue] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        getValue(value);
    };

    useEffect(() => {
        setValue([Math.min(...prices), Math.max(...prices)]);
    }, [prices]);

    return (
        <div className="filter-widget mb-0">
            <div className="price-range-wrap">
                <h4>Price</h4>

                <Box sx={{ width: 250 }} className="range-slider">
                    <Slider
                        value={value}
                        onChange={handleChange}
                        min={Math.min(...prices)}
                        max={Math.max(...prices)}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span>${value[0]}</span>
                        <span>${value[1]}</span>
                    </div>
                </Box>
            </div>
        </div>
    )
}