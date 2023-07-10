import React, { useState, useEffect } from "react";
import axios from "axios";
import Flex from "../../designLayouts/Flex";
import Category from "../Category/Category";
import SearchBar from "../SearchBar/SearchBar";
import ProfilBar from "../ProfilBar/ProfilBar";

const HeaderBottom = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const result = await axios.get("http://localhost:3002/produit/getAll");
      setAllProducts(result.data.data);
    } catch (error) {
      console.log("Erreur lors du chargement des produits :", error);
    }
  }

  function handleCategoryClick(category) {
    setSelectedCategory(category);
    filterProducts(category);
  }

  function handleSearchClick(products) {
    setFilteredProducts(products);
  }

  function filterProducts(category) {
    if (category) {
      const filtered = allProducts.filter(
        (product) => product.categorie.toLowerCase() === category.toLowerCase()
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(allProducts);
    }
  }

  return (
    <div className="w-full bg-[#F5F5F3] relative">
       <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          <Category />
          <SearchBar />
          <ProfilBar />
        </Flex>
      </div>
    </div>
  );
};

export default HeaderBottom;
