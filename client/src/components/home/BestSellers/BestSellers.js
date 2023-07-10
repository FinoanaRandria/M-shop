import React, { useState, useEffect } from "react";
import axios from "axios";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import Category from "../Category/Category";
import SearchBar from "../SearchBar/SearchBar";
import ProfilBar from "../ProfilBar/ProfilBar";
import Flex from "../../designLayouts/Flex";

const BestSellers = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const result = await axios.get("http://localhost:3002/user/getAll");
      setAllProducts(result.data.data);
      setFilteredProducts(result.data.data);
    } catch (error) {
      console.log("Erreur lors du chargement des produits :", error);
    }
  }

  function handleCategoryClick(category) {
    setSelectedCategory(category);
    filterProducts(category);
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
    <div>
      <div className="w-full bg-[#F5F5F3] relative">
        <div className="max-w-container mx-auto">
          <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
            <Category handleCategoryClick={handleCategoryClick} />
            <SearchBar />
            <ProfilBar />
          </Flex>
        </div>
      </div>
      <div className="w-full pb-20">
        <Heading heading="Nos Meilleures Ventes" />
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
          {filteredProducts.map((product) => (
            <Product key={product._id} data={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSellers;
