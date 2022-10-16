import './App.css';
import { MyRoutes } from './myRoutes';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaAngleDoubleUp } from 'react-icons/fa';
import { getUser } from './api/user_API';
import { useDispatch, useSelector } from 'react-redux';
import { changeCartProductId, changeFavouriteId, changeUserData } from './features/userSlice';
import { ToastContainer } from 'react-toastify';

function App() {
  const { pathname } = useLocation();
  const [goTop, setGoTop] = useState(false);
  const dispatch = useDispatch();
  const number = useSelector(state => state.number.data);
  const token = useSelector(state => state.user.token);
  const navigate = useNavigate();


  useEffect(() => {
    window.scrollTo(0, 0);

    if (!token && pathname === "/cart") {
      navigate("/ledress");
    }
    // eslint-disable-next-line
  }, [pathname]);

  useEffect(() => {
    getUser().then(res => {
      dispatch(changeCartProductId(res?.data?.user?.userCart));
      dispatch(changeFavouriteId(res?.data?.user?.favorites));
      dispatch(changeUserData(res?.data));
    });

    // eslint-disable-next-line
  }, [number]);

  window.addEventListener("scroll", function () {
    if (this.scrollY > 1500) {
      setGoTop(true);
    } else {
      setGoTop(false);
    }
  });


  return (
    <div className="App">
      <ToastContainer />
      <MyRoutes />

      {goTop ?
        <div className='go-to-top' onClick={() => window.scrollTo(0, 0)}>
          <FaAngleDoubleUp />
        </div> :
        null
      }
    </div>
  );
}

export default App;
