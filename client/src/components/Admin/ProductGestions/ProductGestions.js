import React , {useState,useEffect} from 'react'
import axios from "axios"

function ProductGestions() {
/* 

  const [image,setImage]= useState('')
  const [nomProduit,setNomProduit]= useState('')
  const [categorieProduit,setCategorieProduit]= useState('')
  const [descriptionProduit,setDescriptionProduit]= useState('')
  const [prixProduit,setPrixProduits]= useState('')
  
  const handleSubmit= (e)=>{
       e.prevent.Default()
      console.log(image,nomProduit,categorieProduit,descriptionProduit,prixProduit);
  } */

  const [produits, setProduits] = useState([]);
  const [formValues, setFormValues] = useState({
    _id: "",
    name: "",
    categorie: "",
    description: "",
    prix: "",
    image: "",
  });

  useEffect(() => {
    loadProduits();
  }, []);

  async function loadProduits() {
    try {
      const response = await axios.get("http://localhost:3002/produit");
      setProduits(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to load produits:", error);
    }
  }

  async function saveProduit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("categorie", formValues.categorie);
    formData.append("description", formValues.description);
    formData.append("prix", formValues.prix);
    formData.append("image", formValues.image);

    try {
      await axios.post("http://localhost:3002/produit", formData);
      alert("Produit registered successfully");
      resetForm();
      loadProduits();
    } catch (error) {
      console.error("Failed to register produit:", error);
      alert("Produit registration failed");
    }
  }

  async function updateProduit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("_id", formValues._id);
    formData.append("name", formValues.name);
    formData.append("categorie", formValues.categorie);
    formData.append("description", formValues.description);
    formData.append("prix", formValues.prix);
    formData.append("image", formValues.image);

    try {
      await axios.patch(
        `http://localhost:3002/produit/update/${formValues._id}`,
        formData
      );
      alert("Produit updated successfully");
      resetForm();
      loadProduits();
    } catch (error) {
      console.error("Failed to update produit:", error);
      alert("Produit update failed");
    }
  }

  function deleteProduit(_id) {
    try {
      axios.delete(`http://localhost:3002/produit/delete/${_id}`);
      alert("Produit deleted successfully");
      loadProduits();
    } catch (error) {
      console.error("Failed to delete produit:", error);
      alert("Produit deletion failed");
    }
  }

  function handleFormInputChange(event) {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  function handleImageInputChange(event) {
    const file = event.target.files[0];
    setFormValues((prevValues) => ({
      ...prevValues,
      image: file,
    }));
  }

  function resetForm() {
    setFormValues({
      _id: "",
      name: "",
      categorie: "",
      description: "",
      prix: "",
      image: null,
    });
  }
  return (
    <div>

<section className="max-w-4xl p-6 mx-auto bg-gray-700 rounded-md shadow-md dark:bg-gray-800 mt-20">
    <h1 className="text-xl font-bold text-white capitalize dark:text-white">
      Ajouter l'image du produit
    </h1>
    <div>
      <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
       
        <div>
          <label className="block text-sm font-medium text-white">Image</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-white"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span className="">Upload a file</span>
                  <input
                    id="file-upload"
                    onChange={handleImageInputChange}
                    type="file"
                    className="sr-only"
                    name='image'
                  />
                </label>
                <p className="pl-1 text-white">or drag and drop</p>
              </div>
              <p className="text-xs text-white">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-6">
       
      </div>
    </div>
  </section>
  <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-20">
    <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
      Produits
    </h2>
    <form>
      <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
        <div>
          <label
            className="text-gray-700 dark:text-gray-200"
            htmlFor="username"
          >
           Nom du produit
          </label>
          <input
            id="username"
            type="text"
            name='name'
             value={formValues.name}
             onChange={handleFormInputChange}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label
            className="text-gray-700 dark:text-gray-200"
            htmlFor="emailAddress"
          >
            Categories
          </label>
          <input
            id="emailAddress"
            type="text"
            name='categorie'
            value={formValues.categorie}
             onChange={handleFormInputChange}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label
            className="text-gray-700 dark:text-gray-200"
            htmlFor="password"
          >
            Descriptions 
          </label>
          <input
            id="text"
            type="text"
            name='description'
            value={formValues.description}
            onChange={handleFormInputChange}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label
            className="text-gray-700 dark:text-gray-200"
            htmlFor="passwordConfirmation"
          >
           Prix
          </label>
          <input
            id="passwordConfirmation"
            type="number"
            name='prix'
            value={formValues.prix}
            onChange={handleFormInputChange}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>
      </div>
      <div className="flex justify-end mt-6">
      {formValues._id ? (
        <button type='submit' onClick={updateProduit}  className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
          update
        </button>
        ) : (
        <button type='submit' onClick={saveProduit}  className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
          save
        </button>
      )}
      </div>
    </form>
  </section>

    </div>
  )
}

export default ProductGestions