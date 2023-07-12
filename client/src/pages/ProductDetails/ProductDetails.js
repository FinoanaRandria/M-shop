// ProductDetails.js
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import ProductsOnSale from "../../components/pageProps/productDetails/ProductsOnSale";

const ProductDetails = () => {
  const { _id } = useParams();
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const [productInfo, setProductInfo] = useState([]);

  useEffect(() => {
    if (location.state && location.state.item) {
      setProductInfo(location.state.item);
    }
    setPrevLocation(location.pathname);
  }, [location, productInfo]);
  useEffect(() => {
    setPrevLocation(location.pathname);

    // Fonction pour récupérer les détails du produit à partir de l'API backend
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3002/produit/${_id}`);
        const data = await response.json();

        if (response.ok) {
          console.log("Product details:", data);
          setProductInfo(data.data);
        } else {
          console.error("Failed to fetch product details:", data.message);
        }
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    };

    fetchProductDetails();
  }, [_id, location.pathname]);

  console.log("Product info:", productInfo);
  console.log("Product info:");


  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto px-4">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4">
          <div className="h-full xl:col-span-2">
            <img
              className="w-[full] h-full object-cover"
              src={`http://localhost:3002/file/${productInfo.image}`}
              alt={productInfo.image}
            />
          </div>
          <div className="h-full w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
            <ProductInfo productInfo={productInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
