/* eslint-disable no-case-declarations */
import React from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const {
    navigate,
    token,
    backendUrl,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items),
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod":
          {
            const response = await axios.post(
              backendUrl + "/api/order/place",
              orderData,
              { headers: { token } },
            );

            if (response.data.success) {
              setCartItems({});
              navigate("/orders");
            } else {
              toast.error(response.data.message);
            }
          }
          break;
        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } },
          );

          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className={`
        flex min-h-[80vh] flex-col justify-between gap-4 border-t pt-5
        sm:flex-row sm:pt-14
      `}
    >
      {/* Left Side */}
      <div
        className={`
          flex w-full flex-col gap-4
          sm:max-w-[480px]
        `}
      >
        <div
          className={`
            my-3 text-xl
            sm:text-2xl
          `}
        >
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            type="text"
            placeholder="First name"
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            type="text"
            placeholder="Last name"
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          type="email"
          placeholder="Email address"
          className="w-full rounded border border-gray-300 px-3.5 py-1.5"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          type="text"
          placeholder="Street"
          className="w-full rounded border border-gray-300 px-3.5 py-1.5"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            type="text"
            placeholder="City"
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            type="text"
            placeholder="State"
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            type="number"
            placeholder="Zipcode"
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            type="text"
            placeholder="Country"
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          type="number"
          placeholder="Phone"
          className="w-full rounded border border-gray-300 px-3.5 py-1.5"
        />
      </div>

      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />

          {/* Payment Method Selection */}
          <div
            className={`
              flex flex-col gap-3
              lg:flex-row
            `}
          >
            <div
              onClick={() => setMethod("stripe")}
              className={`
                flex cursor-pointer items-center gap-3 border p-2 px-3
              `}
            >
              <p
                className={`
                  h-3.5 min-w-3.5 rounded-full border
                  ${method === "stripe" ? `bg-green-400` : ""}
                `}
              ></p>
              <img src={assets.stripe_logo} className="mx-4 h-5" alt="" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className={`
                flex cursor-pointer items-center gap-3 border p-2 px-3
              `}
            >
              <p
                className={`
                  h-3.5 min-w-3.5 rounded-full border
                  ${method === "cod" ? `bg-green-400` : ""}
                `}
              ></p>
              <p className="mx-4 text-sm font-medium text-gray-500">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="mt-8 w-full text-end">
            <button
              className="bg-black px-16 py-3 text-sm text-white"
              type="submit"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
