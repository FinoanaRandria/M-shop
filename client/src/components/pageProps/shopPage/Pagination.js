import React, { useState,useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { paginationItems } from "../../../constants";


const Pagination = ({ itemsPerPage }) => {const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const result = await axios.get("http://localhost:3002/produit");
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
    
    <div className="w-full pb-20">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {filteredProducts.map((product) => (
          <Product key={product._id} data={product} />
        ))}
      </div>
    </div>
    </div>
    );
};

export default Pagination;
