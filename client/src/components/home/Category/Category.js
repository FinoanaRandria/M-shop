import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";

const Category = ({ handleCategoryClick }) => {
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
    <div
      onClick={() => setShow(!show)}
      ref={ref}
      className="flex h-14 cursor-pointer items-center gap-2 text-primeColor"
    >
      <HiOutlineMenuAlt4 className="w-5 h-5" />
      <p className="text-[14px] font-normal">Filtrer par catégorie</p>

      {show && (
        <motion.ul
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute top-36 z-50 bg-primeColor w-auto text-[#767676] h-auto p-4 pb-6"
        >
          {produits.map((categorie, index) => (
            <li
              key={index}
              onClick={() => selectCategory(categorie)}
              className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer"
            >
              {categorie}
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
};

export default Category;
