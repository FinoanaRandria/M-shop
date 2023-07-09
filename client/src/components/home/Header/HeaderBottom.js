import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Flex from "../../designLayouts/Flex";
import { paginationItems } from "../../../constants";
import Category from "../Category/Category";
import SearchBar from "../SearchBar/SearchBar";
import ProfilBar from "../ProfilBar/ProfilBar";

const HeaderBottom = ({ handleCategoryClick }) => {
  const [produits, setProduits] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    (async () => {
      await load();
    })();
  }, []);

  async function load() {
    try {
      const result = await axios.get("http://localhost:3002/user/getAll");
      const categories = result.data.data.map(
        (produit) => produit.categorie.toLowerCase()
      );
      const uniqueCategories = Array.from(new Set(categories));

      setProduits(uniqueCategories);
    } catch (error) {
      console.log("Error loading products:", error);
    }
  }

  async function selectCategory(category) {
    setSelectedCategory(category);
    try {
      const result = await axios.get("http://localhost:3002/user/getAll");
      const filteredProducts = result.data.data.filter(
        (produit) => produit.categorie.toLowerCase() === category.toLowerCase()
      );
      setFilteredProducts(filteredProducts);
      handleCategoryClick(filteredProducts);
    } catch (error) {
      console.log("Error filtering products:", error);
    }
  }

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

  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          <Category />
          <SearchBar handleCategoryClick={handleCategoryClick} />
          <ProfilBar />
        </Flex>
      </div>
    </div>
  );
};

export default HeaderBottom;
