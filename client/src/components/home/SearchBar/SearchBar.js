import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SearchBar = ({ handleCategoryClick }) => {
  const [produits, setProduits] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const result = await axios.get("http://localhost:3002/user/getAll");
      const categories = result.data.data.map((produit) =>
        produit.categorie.toLowerCase()
      );
      const uniqueCategories = Array.from(new Set(categories));

      setProduits(uniqueCategories);
    } catch (error) {
      console.log(error);
    }
  }

  async function selectCategory(category) {
    setSelectedCategory(category);
    try {
      const result = await axios.get("http://localhost:3002/user/getAll");
      const filteredProducts = result.data.data.filter(
        (produit) =>
          produit.categorie.toLowerCase() === category.toLowerCase()
      );
      setFilteredProducts(filteredProducts);
      handleCategoryClick(filteredProducts);
    } catch (error) {
      console.log(error);
    }
  }

  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();
  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (ref.current.contains(e.target)) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, [show, ref]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);
    try {
      const result = await axios.get(
        `http://localhost:3002/produit/getAll?searchQuery=${e.target.value}`
      );
      const filteredProducts = result.data.data.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredProducts(filteredProducts);
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
      <input
        className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
        type="text"
        onChange={handleSearch}
        value={searchQuery}
        placeholder="Search your products here"
      />
      <FaSearch className="w-5 h-5" />
      {searchQuery && (
        <div className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}>
          {filteredProducts.map((item) => (
            <div
              onClick={() =>
                navigate(`/product/${item.productName.toLowerCase().split(" ").join("")}`, {
                  state: {
                    item: item,
                  },
                }) &
                setShowSearchBar(true) &
                setSearchQuery("")
              }
              key={item._id}
              className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3"
            >
              <img
                className="w-24"
                src={`http://localhost:3002/file/${item.image}`}
                alt="productImg"
              />
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-lg">{item.name}</p>
                <p className="text-xs">{item.description}</p>
                <p className="text-sm">
                  Price:{" "}
                  <span className="text-primeColor font-semibold">
                    ${item.prix}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
