import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useState } from "react";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div
      className={`
        border-t-2 pt-10 opacity-100 transition-opacity duration-500 ease-in
      `}
    >
      {/* Product Data */}
      <div
        className={`
          flex flex-col gap-12
          sm:flex-row sm:gap-12
        `}
      >
        {/* Product Images */}
        <div
          className={`
            flex flex-1 flex-col-reverse gap-3
            sm:flex-row
          `}
        >
          <div
            className={`
              flex w-full justify-between overflow-x-auto
              sm:w-[18.7%] sm:flex-col sm:justify-normal sm:overflow-y-scroll
            `}
          >
            {productData.image.map((item, index) => (
              <img
                key={index}
                onClick={() => setImage(item)}
                className={`
                  w-[24%] shrink-0 cursor-pointer
                  sm:mb-3 sm:w-full
                `}
                src={item}
                alt=""
              />
            ))}
          </div>
          <div
            className={`
              w-full
              sm:w-4/5
            `}
          >
            <img className="h-auto w-full" src={image} alt="" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="mt-2 text-2xl font-medium">{productData.name}</h1>
          <div className="mt-2 flex items-center gap-1">
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_dull_icon} alt="" className={`w-3`} />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p
            className={`
              mt-5 text-gray-500
              md:w-4/5
            `}
          >
            {productData.description}
          </p>
          <div className="my-8 flex flex-col gap-4">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  className={`
                    border bg-gray-100 px-4 py-2
                    ${size === item ? "border-orange-500" : ""}
                  `}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            className={`
              bg-black px-8 py-3 text-white
              active:bg-gray-700
            `}
            onClick={() => addToCart(productData._id, size)}
          >
            ADD TO CART
          </button>
          <hr
            className={`
              mt-8
              sm:w-4/5
            `}
          />
          <div className="mt-5 flex flex-col gap-1 text-sm text-gray-500">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* Description & Review Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border-x border-t px-5 py-3 text-sm">Description</b>
          <p className="border-r border-t px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className={`flex flex-col gap-4 border p-6 text-sm text-gray-500`}>
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>

      {/* Display Related Products */}

      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
        productId={productId}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
