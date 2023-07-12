import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

import { motion } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { paginationItems } from "../../../constants";
import Category from "../Category/Category";
import SearchBar from "../SearchBar/SearchBar";
const ProfilBar = ({handleCategoryClick}) => {

  const [produits, setProduits] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    (async () => {
      await load();
    })();
  }, []);

  async function load() {
    const result = await axios.get('http://localhost:3002/user/getAll');
    const categories = result.data.data.map((produit) => produit.categorie.toLowerCase());
    const uniqueCategories = Array.from(new Set(categories));

    setProduits(uniqueCategories);
  }

  async function selectCategory(category) {
    setSelectedCategory(category);
    const result = await axios.get('http://localhost:3002/user/getAll');
    const filteredProducts = result.data.data.filter(
      (produit) => produit.categorie.toLowerCase() === category.toLowerCase()
    );
    setFilteredProducts(filteredProducts);
    handleCategoryClick(filteredProducts);
  }
/* static  */
  const products = useSelector((state) => state.orebiReducer.products);
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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filtered = paginationItems.filter((item) =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);
  //fonction deconnexion
       const handlelogout = ()=>{
           localStorage.clear()
       navigate('/signin')
       }
  /* static */

  return (
        <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
            <div onClick={() => setShowUser(!showUser)} className="flex">
              <FaUser />
              <FaCaretDown />
            </div>
            {showUser && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-6 left-0 z-50 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6"
              >
                  <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Profile
                  </li>
               
                <li onClick={handlelogout} className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer">
                  Logout
                </li>
              </motion.ul>
            )}
            <Link to="/cart">
              <div className="relative">
                <FaShoppingCart />
                <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
                  {products.length > 0 ? products.length : 0}
                </span>
              </div>
            </Link>
          </div>
  );
};

export default ProfilBar;
