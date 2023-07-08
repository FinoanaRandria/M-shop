import React,{useState,useEffect} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import {
  bestSellerOne,
  bestSellerTwo,
  bestSellerThree,
  bestSellerFour,
} from "../../../assets/images/index";

const BestSellers = () => {

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
    <div className="w-full pb-20">
      <Heading heading="Our Bestsellers" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
      
          {produitData.map((product) => (
            <Product key={product._id} data={product} />
          ))}
        
        {/* <Product
          _id="1011"
          img={bestSellerOne}
          productName="Flower Base"
          price="35.00"
          color="Blank and White"
          badge={true}
          des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
        />
        <Product
          _id="1012"
          img={bestSellerTwo}
          productName="New Backpack"
          price="180.00"
          color="Gray"
          badge={false}
          des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
        />
        <Product
          _id="1013"
          img={bestSellerThree}
          productName="Household materials"
          price="25.00"
          color="Mixed"
          badge={true}
          des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
        />
        <Product
          _id="1014"
          img={bestSellerFour}
          productName="Travel Bag"
          price="220.00"
          color="Black"
          badge={false}
          des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
        />*/}
      </div> 
    </div>
  );
};

export default BestSellers;
