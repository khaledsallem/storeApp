import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps'

export default function ShippingAdressScreen(props) {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    if (!userInfo) {
        props.history.push("/signin")
    }
    const [fullName, setFullName] = useState(shippingAddress.name);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [phone, setPhone] = useState(shippingAddress.phone);
    const [country, setCountry] = useState(shippingAddress.country);
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ fullName, address, city, phone, postalCode, country }));
        props.history.push("/payment");
    };

    return (
        <div>
            <CheckoutSteps step1 step2 ></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Shipping Adress</h1>
                </div>
                <div>
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" id="fullName" placeholder="Enter your full name"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" placeholder="Enter your address"
                        value={address}
                        onChange={e => setAddress(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" placeholder="Enter your city"
                        value={city}
                        onChange={e => setCity(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="postalCode">postal Code</label>
                    <input type="text" id="postalCode" placeholder="Enter postal code"
                        value={postalCode}
                        onChange={e => setPostalCode(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="phone">Phone Number</label>
                    <input type="text" id="phone" placeholder="Enter phone number"
                        value={phone}
                        onChange={e => setPhone(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="country">Country</label>
                    <input type="text" id="country" placeholder="Enter country"
                        value={country}
                        onChange={e => setCountry(e.target.value)} required></input>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">
                        Continue
                    </button>
                </div>
            </form>
        </div>
    )
}
