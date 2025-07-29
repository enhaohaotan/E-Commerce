import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link className="block cursor-pointer text-gray-700" to={`/product/${id}`}>
      <div className="w-full overflow-hidden">
        <img
          className={`
            block size-full object-cover transition ease-in-out
            hover:scale-110
          `}
          src={image[0]}
          alt=""
        />
      </div>
      <p className="pb-1 pt-3 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;
