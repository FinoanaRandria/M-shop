import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";

const ProductInfo = ({ productInfo }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{productInfo.name}</h2>
      <p className="text-xl font-semibold">Ar {productInfo.prix}</p>
      <p className="text-base text-gray-600">{productInfo.description}</p>
      <p className="text-sm">Be the first to leave a review.</p>
      <p className="font-medium text-lg">
        <span className="font-normal">Color:</span> Noir , Blanc , Rouge
      </p>
      <button
        onClick={() =>
          dispatch(
            addToCart({
              _id: productInfo._id,
              name: productInfo.name,
              quantity: 1,
              image: `http://localhost:3002/file/${productInfo.image}`,
              price: productInfo.prix,
              categorie: productInfo.categorie,
            })
          )
        }
        className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
      >
        Add to Cart
      </button>
      <p className="font-normal text-sm">
        <span className="text-base font-medium"> Categories:</span> {productInfo.categorie}
      </p>
    </div>
  );
};

export default ProductInfo;
