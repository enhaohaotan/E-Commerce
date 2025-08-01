import React, { useEffect, useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category),
      );
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory),
      );
    }
    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div
      className={`
        flex flex-col gap-1 border-t pt-10
        sm:flex-row sm:gap-10
      `}
    >
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 flex items-center gap-2 text-xl"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            className={`
              h-3
              sm:hidden
              ${showFilter ? "rotate-90" : ""}
            `}
            alt=""
          />
        </p>
        {/* Category Filter */}
        <div
          className={`
            mt-6 border border-gray-300 py-3 pl-5
            ${showFilter ? "" : `hidden`}
            sm:block
          `}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label htmlFor="men">
              <p className="flex gap-2">
                <input
                  id="men"
                  type="checkbox"
                  className="w-3"
                  value={"Men"}
                  onChange={toggleCategory}
                />{" "}
                Men
              </p>
            </label>
            <label htmlFor="women">
              <p className="flex gap-2">
                <input
                  id="women"
                  type="checkbox"
                  className="w-3"
                  value={"Women"}
                  onChange={toggleCategory}
                />{" "}
                Women
              </p>
            </label>
            <label htmlFor="kids">
              <p className="flex gap-2">
                <input
                  id="kids"
                  type="checkbox"
                  className="w-3"
                  value={"Kids"}
                  onChange={toggleCategory}
                />{" "}
                Kids
              </p>
            </label>
          </div>
        </div>
        {/* SubCategory Filter */}
        <div
          className={`
            my-5 border border-gray-300 py-3 pl-5
            ${showFilter ? "" : `hidden`}
            sm:block
          `}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label htmlFor="topwear">
              <p className="flex gap-2">
                <input
                  id="topwear"
                  type="checkbox"
                  className="w-3"
                  value={"Topwear"}
                  onChange={toggleSubCategory}
                />{" "}
                Topwear
              </p>
            </label>
            <label htmlFor="bottomwear">
              <p className="flex gap-2">
                <input
                  id="bottomwear"
                  type="checkbox"
                  className="w-3"
                  value={"Bottomwear"}
                  onChange={toggleSubCategory}
                />{" "}
                Bottomwear
              </p>
            </label>
            <label htmlFor="winterwear">
              <p className="flex gap-2">
                <input
                  id="winterwear"
                  type="checkbox"
                  className="w-3"
                  value={"Winterwear"}
                  onChange={toggleSubCategory}
                />{" "}
                Winterwear
              </p>
            </label>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div
          className={`
            mb-4 flex justify-between text-base
            sm:text-2xl
          `}
        >
          <Title text1={"All"} text2={"COLLECTIONS"} />
          {/* Product Sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 px-2 text-sm"
          >
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div
          className={`
            grid grid-cols-2 gap-4 gap-y-6
            md:grid-cols-3
            lg:grid-cols-4
          `}
        >
          {filterProducts.map((item, index) => (
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
    </div>
  );
};

export default Collection;
