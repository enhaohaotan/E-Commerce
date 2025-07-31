import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14">
      <div className="mb-3 text-2xl">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div>
        {cartData.map((item) => {
          const productData = products.find(
            (product) => product._id === item._id,
          );

          return (
            <div
              key={`${item._id}-${item.size}`}
              className={`
                grid grid-cols-[4fr_0.5fr_05fr] items-center gap-4 border-y py-4
                text-gray-700
                sm:grid-cols-[4fr_2fr_0.5fr]
              `}
            >
              <div className="flex items-start gap-6">
                <img
                  src={productData.image[0]}
                  className={`
                    w-16
                    sm:w-20
                  `}
                  alt=""
                />
                <div>
                  <p
                    className={`
                      text-xs font-medium
                      sm:text-lg
                    `}
                  >
                    {productData.name}
                  </p>
                  <div className="mt-2 flex items-center gap-5">
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                    <p
                      className={`
                        border bg-slate-50 px-2
                        sm:px-3 sm:py-1
                      `}
                    >
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>
              <input
                type="number"
                min={1}
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? updateQuantity(item._id, item.size, 1)
                    : updateQuantity(
                        item._id,
                        item.size,
                        Number(e.target.value),
                      )
                }
                value={item.quantity}
                className={`
                  max-w-10 border p-1
                  sm:max-w-20 sm:px-2
                `}
              />
              <img
                src={assets.bin_icon}
                className={`
                  mr-4 w-4 cursor-pointer
                  sm:w-5
                `}
                alt=""
                onClick={() => updateQuantity(item._id, item.size, 0)}
              />
            </div>
          );
        })}
      </div>
      <div className="my-20 flex justify-end">
        <div
          className={`
            w-full
            sm:w-[450px]
          `}
        >
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="my-8 bg-black px-8 py-3 text-sm text-white"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
