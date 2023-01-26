import './registration.scss';
import { FaEnvelope, FaLock, FaUserAlt } from 'react-icons/fa';
import { MdOutlineClose } from 'react-icons/md';
import { useState } from 'react';
import { registration } from '../../api/user_API';
import { changeUserData } from '../../features/userSlice';
import { useDispatch } from 'react-redux';

export const Registration = ({ setShowRegister }) => {
    const [user] = useState({
        userName: "",
        lastName: "",
        email: "",
        password: "",
        avatar: ""
    });
    const dispatch = useDispatch();

    const onChangeHandler = (e) => {
        if (["email", "password", "userName", "lastName"].includes(e.target.id)) {
            user[e.target.id] = e.target.value;
        }

        if (e.target.id === "avatar") {
            user[e.target.id] = e.target.files[0];
        }
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("userName", user.userName);
        formData.append("lastName", user.lastName);
        formData.append("email", user.email);
        formData.append("password", user.password);
        formData.append("file", user.avatar);

        const res = await registration(formData);
        console.log(res);
        if (res.status === 200) {
            setShowRegister(false);
            dispatch(changeUserData(res.data));
            window.location.href = "/ledress";
        }
    }

    return (
        <div className='registration-background'>
            <div className="form_wrapper">
                <div className="form_container">
                    <div className="title_container">
                        <h2>Registration</h2>
                        <MdOutlineClose onClick={() => setShowRegister(false)} />
                    </div>

                    <div className="row clearfix">
                        <div className="">
                            <form
                                onChange={(e) => onChangeHandler(e)}
                                onSubmit={(e) => onSubmitHandler(e)}
                            >
                                <div className="input_field">
                                    <span>
                                        <FaEnvelope />
                                    </span>
                                    <input type="email" name="email" placeholder="Email" id='email' required />
                                </div>

                                <div className="input_field">
                                    <span>
                                        <FaLock />
                                    </span>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        id='password'
                                        required
                                    />
                                </div>

                                <div className="input_field">
                                    <span>
                                        <FaLock />
                                    </span>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Re-type Password"
                                        required
                                    />
                                </div>

                                <div className="row clearfix">
                                    <div className="col_half">
                                        <div className="input_field">
                                            <span>
                                                <FaUserAlt />
                                            </span>
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="First Name"
                                                id='userName'
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col_half">
                                        <div className="input_field">
                                            <span>
                                                <FaUserAlt />
                                            </span>
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Last Name"
                                                id='lastName'
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="input_field">
                                    <input
                                        type="file"
                                        name="file"
                                        accept="image/*"
                                        id='avatar'
                                        required
                                    />
                                </div>

                                <div className="input_field radio_option">
                                    <input
                                        type="radio"
                                        name="radiogroup1"
                                        id="rd1"
                                    />
                                    <label htmlFor="rd1">Male</label>

                                    <input
                                        type="radio"
                                        name="radiogroup1"
                                        id="rd2"
                                    />
                                    <label htmlFor="rd2">Female</label>
                                </div>

                                <div className="input_field checkbox_option">
                                    <input type="checkbox" id="cb1" />
                                    <label htmlFor="cb1">I agree with terms and conditions</label>
                                </div>

                                <div className="input_field checkbox_option">
                                    <input type="checkbox" id="cb2" />
                                    <label htmlFor="cb2">I want to receive the newsletter</label>
                                </div>

                                <input
                                    className="button"
                                    type="submit"
                                    value="Register"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}