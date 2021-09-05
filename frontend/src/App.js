import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import CartScreen from './screen/CartScreen';
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';
import SigninScreen from './screen/SigninScreen';
import RegisterScreen from "./screen/RegisterScreen"
import ShippingAddressScreen from './screen/ShippingAddressScreen';
import PaymentMethodScreen from './screen/PaymentMethodScreen';
import PlaceOrderScreen from './screen/PlaceOrderScreen';
import OrderScreen from './screen/OrderScreen';
import OrderHistoryScreen from './screen/OrderHistoryScreen';
import ProfileScreen from './screen/ProfilScreen';
import PrivateRoute from './components/PrivateRoute';
import Sliders from './components/Sliders';

function App() {
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  }

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">shop</Link>
          </div>
          <div>
            <Link to="/cart">Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {
              userInfo ? (
                <div className="dropdown">
                  <Link to="#">
                    {userInfo.name} <i className="fa fa-caret-down"></i> {' '}
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                      <Link to="/orderhistory">Order history</Link>
                    </li>
                    <li>
                      <Link to='#signout' onClick={signoutHandler}>Sign Out</Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/signin">Sign In</Link>
              )
            }
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin" >Admin <i className="fa fa-caret-down"></i></Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="dashboard">Dashboard</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <main>
          <Sliders />
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} ></Route>
          <Route path="/signin" component={SigninScreen} ></Route>
          <Route path="/register" component={RegisterScreen} ></Route>
          <Route path="/shipping" component={ShippingAddressScreen} ></Route>
          <Route path="/payment" component={PaymentMethodScreen} ></Route>
          <Route path="/placeorder" component={PlaceOrderScreen} ></Route>
          <Route path="/order/:id" component={OrderScreen} ></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen} ></Route>
          <PrivateRoute path="/profile" component={ProfileScreen} ></PrivateRoute>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
