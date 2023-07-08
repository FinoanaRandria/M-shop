import React,{useState,useEffect} from "react";
import axios from "axios";
import Cookies from 'js-cookie';

/* import Banner from "../../components/Banner/Banner"; */
import BannerBottom from "../../components/Banner/BannerBottom";
import BestSellers from "../../components/home/BestSellers/BestSellers";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
/* import Sale from "../../components/home/Sale/Sale"; */
import SpecialOffers from "../../components/home/SpecialOffers/SpecialOffers";
import YearProduct from "../../components/home/YearProduct/YearProduct";
import Product from "../../components/home/Products/Product";

const Home = () => {
  
  const [Search, setSearch] = useState('');
  const [filterSearch, setFilterSearch] = useState([]);
  const [selectedCategoryProducts, setSelectedCategoryProducts] = useState([]);
  const [produitData, setProduitData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Effectue la vérification de l'authentification et met à jour l'état
    const checkAuthentication = async () => {
      const authToken = Cookies.get('token_jwt');
      setIsLoggedIn(!!authToken);
    };

    // Vérifie l'authentification après la récupération des données
    const fetchData = async () => {
      try {
        const result = await axios.get('http://localhost:3002/user/getAll');
        setProduitData(result.data.data);
        await checkAuthentication(); // Vérifie l'authentification après la récupération des données
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // Appelle la fonction pour récupérer les données
  }, []);
  return (
    <div className="w-full mx-auto">
      {/* <Banner /> */}
      <BannerBottom />
      <div className="max-w-container mx-auto px-4">
        {/* <Sale /> */}{/* 
        <NewArrivals /> */}
       

        <BestSellers />{/* 
        <YearProduct />
        <SpecialOffers /> */}
      </div>
    </div>
  );
};

export default Home;
