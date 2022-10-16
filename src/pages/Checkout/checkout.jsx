import './checkout.scss';
import { MdOutlineClose } from 'react-icons/md';
import { GrMapLocation } from 'react-icons/gr';
import { AiTwotonePhone } from 'react-icons/ai';
import { removeCart } from '../../api/product_API';
import Swal from 'sweetalert2';

export const Checkout = ({ setShowCheckout, total, userCart }) => {
    const onSubmitHandler = (e) => {
        e.preventDefault();

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'We have entered your order',
            showConfirmButton: false,
            timer: 1500
        }).then(res => {
            Swal.fire({
                title: 'Do you want to delete cart page\'s products?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, leave it'
            }).then((result) => {
                if (result.isConfirmed) {
                    for (let i = 0; i < userCart.length; i++) {
                        removeCart(userCart[i]._id);
                    }
                    window.location.href = "/ledress";
                } else {
                    window.location.href = "/ledress";
                }
            });
        })
    }

    return (
        <div className='registration-background'>
            <div className="form_wrapper">
                <div className="form_container">
                    <div className="title_container">
                        <h2>Fill details</h2>
                        <MdOutlineClose onClick={() => setShowCheckout(false)} />
                    </div>

                    <div className="row clearfix">
                        <div className="">
                            <form onSubmit={(e) => onSubmitHandler(e)}>
                                <div className="input_field">
                                    <span>
                                        <GrMapLocation />
                                    </span>
                                    <input
                                        type="text"
                                        name="text"
                                        placeholder="Address"
                                        id='text'
                                        required
                                    />
                                </div>

                                <div className="input_field">
                                    <span>
                                        <AiTwotonePhone />
                                    </span>

                                    <input
                                        type="tel"
                                        name="tel"
                                        placeholder="Phone number"
                                        id='tel'
                                        required
                                    />
                                </div>
                                <h2 style={{ marginBottom: "15px" }}>{`Total cost: $${total}.00`}</h2>

                                <input
                                    className="button"
                                    type="submit"
                                    value="Order"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
