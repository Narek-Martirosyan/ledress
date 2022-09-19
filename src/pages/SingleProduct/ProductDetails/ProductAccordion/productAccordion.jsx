import './productAccordion.scss';
import Accordion from 'react-bootstrap/Accordion';

export const ProductAccordion = ({ singleProduct }) => {
    return (
        <Accordion defaultActiveKey={['0']} alwaysOpen className='accordion-area'>
            <Accordion.Item eventKey="0" className=''>
                <Accordion.Header className=''>information</Accordion.Header>
                <Accordion.Body className=''>
                    {singleProduct?.productDescription}
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>shipping & Returns</Accordion.Header>
                <Accordion.Body>
                    <h4>7 Days Returns</h4>
                    <p>Cash on Delivery Available <br /> Home Delivery <span>3 - 4 days</span></p>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}