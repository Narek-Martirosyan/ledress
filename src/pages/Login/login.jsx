import './login.scss';
import { FaEnvelope } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';
import { MdOutlineClose } from 'react-icons/md';
import { useState } from 'react';
import { login } from '../../api/user_API';
import { useDispatch } from 'react-redux';
import { changeUserData } from '../../features/userSlice';

export const Login = ({ setShowLogin }) => {
    const [user] = useState({
        email: "elonmusk@gmail.com",
        password: "elonmusk@gmail.com"
    });
    const dispatch = useDispatch();

    const onChangeHandler = (e) => {
        user[e.target.id] = e.target.value;
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const res = await login(user);
        try {
            if (res.status === 200) {
                dispatch(changeUserData(res.data));
                setShowLogin(false);
                window.location.href = "/ledress";
            }
        } catch (err) {
            console.log(err);

            throw err;
        }
    }

    return (
        <div className='registration-background'>
            <div className="form_wrapper">
                <div className="form_container">
                    <div className="title_container">
                        <h2>Login</h2>
                        <MdOutlineClose onClick={() => setShowLogin(false)} />
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
                                    <input
                                        type="email"
                                        name="email"
                                        defaultValue={"elonmusk@gmail.com"}
                                        placeholder="Email"
                                        id='email'
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
                                        defaultValue={"elonmusk@gmail.com"}
                                        placeholder="Password"
                                        id='password'
                                        required
                                    />
                                </div>

                                <input
                                    className="button"
                                    type="submit"
                                    value="Log in"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}