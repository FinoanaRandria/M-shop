import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { resetCart } from "../../redux/orebiSlice";
import { emptyCart } from "../../assets/images/index";
import ItemCard from "./ItemCard";

const Cart = ({item}) => {
  const products = useSelector((state) => state.orebiReducer.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [nom, setNom] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3002/api/login")
      .then((response) => {
        const data = response.data;
        console.log("Données de l'API :", data);
        setNom(data.user[0].nom);
        setEmail(data.user[0].email);
        setId(data.user[0].id); // Mettre à jour l'ID à partir de la réponse de l'API
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données de l'API :", error);
      });
  }, []);

  useEffect(() => {
    console.log("ID mis à jour :", id);
    console.log("Nom:", nom);
    console.log("Email:", email);
  }, [id, nom, email]);

  const notify = () => {
    // Envoyez les données du panier au serveur via une requête POST
    axios
      .post(`http://localhost:3002/commande/commande/${id}/${nom}/${email}`, { panierDatas: products })
      .then((response) => {
        toast.success("Paiement réussi");
        setTimeout(() => {
          navigate("/");
        }, 3000);
        dispatch({ type: "EMPTY_PANIER" }); // Vider le panier
      })
      .catch((error) => {
        toast.error("Erreur lors du paiement");
        console.error("Erreur lors du paiement : ", error);
      });
  };
  const [totalAmt, setTotalAmt] = useState("");
  const [shippingCharge, setShippingCharge] = useState("");
  useEffect(() => {
    let price = 0;
    products.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price);
  }, [products]);
  useEffect(() => {
    if (totalAmt <= 200) {
      setShippingCharge(30);
    } else if (totalAmt <= 400) {
      setShippingCharge(25);
    } else if (totalAmt > 401) {
      setShippingCharge(20);
    }
  }, [totalAmt]);
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Cart" />
      {products.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Produit</h2>
            <h2>Prix</h2>
            <h2>Quantite</h2>
            <h2>Sous Total</h2>
          </div>
          <div className="mt-5">
            {products.map((item) => (
              <div key={item._id}>
                <ItemCard item={item} />
              </div>
            ))}
          </div>

          <button
            onClick={() => dispatch(resetCart())}
            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
          >
            Reset cart
          </button>

          <div className="flex flex-col mdl:flex-row justify-between border py-4 px-4 items-center gap-2 mdl:gap-0">
            <div className="flex items-center gap-4">
              <input
                className="w-44 mdl:w-52 h-8 px-4 border text-primeColor text-sm outline-none border-gray-400"
                type="text"
                placeholder="Coupon Number"
              />
              <p className="text-sm mdl:text-base font-semibold">
                Apply Coupon
              </p>
            </div>
            <p className="text-lg font-semibold">Update Cart</p>
          </div>
          <div className="max-w-7xl gap-4 flex justify-end mt-4">
            <div className="w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-right">Cart totals</h1>
              <div>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Sous total
                  <span className="font-semibold tracking-wide font-titleFont">
                    Ar{totalAmt}
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                Frais d'expédition
                  <span className="font-semibold tracking-wide font-titleFont">
                    Ar{shippingCharge}
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Total
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    Ar{totalAmt + shippingCharge}
                  </span>
                </p>
              </div>
              <div className="flex justify-end">
                <Link to="/paymentgateway">
                  <button  onClick={() => dispatch(resetCart())} className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
                  Passer à la caisse
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Your Cart feels lonely.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
            </p>
            <Link to="/shop">
              <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
