import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {AiFillDelete} from 'react-icons/ai'
import {RiEdit2Fill} from 'react-icons/ri'
import ProductGestions from '../ProductGestions/ProductGestions';

const ProductTable = () => {
  const [produits, setProduits] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    Load();
  }, []);

  async function Load() {
    try {
      const response = await axios.get("http://localhost:3002/produit");
      setProduits(response.data.data);
    } catch (error) {
      console.log("Failed to load products:", error);
    }
  }

  function openModal(product) {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedProduct(null);
  }

  async function deleteProduct(_id) {
    try {
      await axios.delete("http://localhost:3002/produit/delete/" + _id);
      alert("Product deleted successfully");
      Load();
    } catch (error) {
      alert("Failed to delete product");
    }
  }

  return (
    <div>
      <table className="table-auto ml-96 text-gray w-full bg-slate-100">
            <thead className='bg-primary bg-gray-600 text-white '>
                <tr className='border'>
                    <th className='p-3'>Code</th>
                    <th className='p-3'>Nom</th>
                    <th className='p-3'>Categorie</th>
                    <th className='p-3'>Description</th>
                    <th className='p-3'>Prix</th>
                    <th className='p-3'>Photo</th>
                    <th className='p-3'>Actions</th>
                </tr>
            </thead>
        <tbody>
          {produits.map((produit, index) => (
            <tr key={index} className=''>
              <td className='p-3'>{produit._id}</td>
              <td className='p-3'>{produit.name}</td>
              <td className='p-3'>{produit.categorie}</td>
              <td className='p-3'>{produit.description}</td>
              <td className='p-3'>{produit.prix} Ar</td>
              <td>
                {produit.image && (
                  <img src={`http://localhost:3002/${produit.image}`} alt="Product" className='w-[50px]' />
                )}
              </td>
              <td className='justify-center text-center'>
                
              <button onClick={() => deleteProduct(produit._id)}><AiFillDelete size={25} className=' text-red-800 '/> </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default ProductTable;
