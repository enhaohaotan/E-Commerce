import React from "react";
import Title from "../components/Title";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } },
      );
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="border-b text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className={`
              flex flex-col gap-4 border-b py-4 text-gray-700
              md:flex-row md:items-center md:justify-between
            `}
          >
            <div className="flex items-start gap-6 text-sm">
              <img
                src={item.image[0]}
                className={`
                  w-16
                  sm:w-20
                `}
                alt=""
              />
              <div>
                <p
                  className={`
                    font-medium
                    sm:text-base
                  `}
                >
                  {item.name}
                </p>
                <div
                  className={`
                    mt-2 flex items-center gap-3 text-base text-gray-700
                  `}
                >
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="mt-2">
                  Date:{" "}
                  <span className="text-gray-400">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </p>
                <p className="mt-2">
                  Payment:{" "}
                  <span className="text-gray-400">{item.paymentMethod}</span>
                </p>
              </div>
            </div>
            <div
              className={`
                flex justify-between
                md:w-1/2
              `}
            >
              <div className="flex items-center gap-2">
                <p className="h-2 min-w-2 rounded-full bg-green-500"></p>
                <p
                  className={`
                    text-sm
                    md:text-base
                  `}
                >
                  {item.status}
                </p>
              </div>
              <button
                onClick={loadOrderData}
                className={`rounded-sm border px-4 py-2 text-sm font-medium`}
              >
                Update Status
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
