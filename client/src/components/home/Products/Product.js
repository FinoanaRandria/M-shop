import React from "react";
import { useSelector } from "react-redux";

import { BsSuitHeartFill } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate,useParams,Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";

const Product = ({ data, props }) => {
  const userId = useSelector((state) => state.userId);
  
  const dispatch = useDispatch();
  const { _id } = useParams();
  console.log(_id);
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);

  const navigate = useNavigate();
  const productItem = props;


  const handleAddToWishlist = () => {
    console.log("ID de l'utilisateur connecté :", userId);
    console.log("ID du produit :", data._id);
    // Ici, vous pouvez exécuter le code pour ajouter le produit à la liste des favoris
  };
  const handleProductDetails = () => {
    navigate(`/produit/${rootId}`, {
      state: {
        item: productItem,
      },
    });
  };
  return (
    <div className="w-full relative group">
      <div className="max-w-50 max-h-48 relative overflow-y-hidden ">
        <div>
          <Image
            className="w-full align-items justify-center h-full"
            imgSrc={`http://localhost:3002/file/${data.image}`}
          />
        </div>
        <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
              Compare
              <span>
                <GiReturnArrow />
              </span>
            </li>
            <li
              onClick={() =>
                dispatch(
                  addToCart({
                    _id: data._id,
                    name: data.name,
                    quantity: 1,
                    image: `http://localhost:3002/file/${data.image}`,
                    price: data.prix,
                    categorie: data.categorie,
                  })
                )
              }
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              Add to Cart
              <span>
                <FaShoppingCart />
              </span>
            </li>

            <Link to={`/produit/${data._id}`}>
              <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
                View Details
                <span className="text-lg">
                  <MdOutlineLabelImportant />
                </span>
              </li>
            </Link>
            <li onClick={handleAddToWishlist} className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
              Add to Wish List
              <span>
                <BsSuitHeartFill />
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-bold">{data.name}</h2>
          <p className="text-[#767676] text-[14px]">{data.prix} Ar</p>
        </div>
        <div>
          <p className="text-[#767676] text-[14px]">{data.categorie}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
