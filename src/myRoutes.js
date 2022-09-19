import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { MainLayout } from './layouts/MainLayout';
import { Products } from './pages/Products';
import { SingleProducts } from './pages/SingleProduct';
import { CartPage } from './pages/CartPage';
import { MyAccount } from './pages/MyAccount';

export const MyRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<MainLayout />}>
                <Route path='/ledress' element={<Home />} />
                <Route path='/products' element={<Products />} />
                <Route path='/products/:id' element={<SingleProducts />} />
                <Route path='/cart' element={<CartPage />} />
                <Route path='/myaccount' element={<MyAccount />} />
            </Route>
            <Route path='*' element={"ERROR 404, PAGE NOT FOUND"}/>
        </Routes>
    )
}