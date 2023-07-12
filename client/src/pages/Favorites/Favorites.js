import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import axios from "axios";

const Favorites = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3002/api/user")
      .then((response) => {
        const data = response.data;
        console.log(response.data);
        setUser(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données de l'utilisateur :", error);
      });
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Favorites" />
      <h1>Welcome, {user.nom}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Favorites;
