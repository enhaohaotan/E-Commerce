import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const RelatedProducts = ({ category, subCategory, productId }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter(
        (item) =>
          category === item.category &&
          subCategory === item.subCategory &&
          item._id !== productId,
      );

      setRelated(productsCopy.slice(0, 5));
    }
  }, [products]);

  return (
    <div className="my-24">
      <div className="py-2 text-center text-3xl">
        <Title text1={"RELATED"} text2={"PRODUCTS"}></Title>
      </div>
      <div
        className={`
          grid grid-cols-2 gap-4 gap-y-6
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
        `}
      >
        {related.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
