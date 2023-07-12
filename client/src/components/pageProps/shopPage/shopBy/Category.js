import React, { useState,useRef,useEffect } from "react";
import axios from "axios"
// import { FaPlus } from "react-icons/fa";
import { ImPlus } from "react-icons/im";
import NavTitle from "./NavTitle";

const Category = ({handleCategoryClick}) => {
  const [produits, setProduits] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    loadProduits();
  }, []);

  async function loadProduits() {
    try {
      const result = await axios.get("http://localhost:3002/produit");
      const categories = result.data.data.map(
        (produit) => produit.categorie.toLowerCase()
      );
      const uniqueCategories = Array.from(new Set(categories));

      setProduits(uniqueCategories);
    } catch (error) {
      console.log("Erreur lors du chargement des produits :", error);
    }
  }

  function selectCategory(category) {
    setSelectedCategory(category);
    handleCategoryClick(category);
  }

  const [show, setShow] = useState(false);
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
  return (
    <div className="w-full">
      <NavTitle title="Shop by Category" icons={false} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
        {produits.map((categorie, index) => (
            <li
              key={index}
              onClick={() => selectCategory(categorie)}
              className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer"
            >
              {categorie}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
