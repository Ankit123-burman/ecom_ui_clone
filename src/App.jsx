import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Products from "./components/Products/Products";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from 'axios';
import TopProducts from "./components/TopProducts/TopProducts";
import Banner from "./components/Banner/Banner";
import Subscribe from "./components/Subscribe/Subscribe";
import Testimonials from "./components/Testimonials/Testimonials";
import Footer from "./components/Footer/Footer";
import Popup from "./components/Popup/Popup";

const App = () => {
  const [finalcategory,setFinalcategory] = useState([])
  const [finalpro, setFinalproduct] = useState([])
  const [catName,setCatname] = useState("");
  const [currentPage,setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [orderPopup, setOrderPopup] = React.useState(false);

  const getCategory = () =>{
    axios.get('https://dummyjson.com/products/categories')
    .then((res)=>res.data)
    .then((finalres)=>{
      setFinalcategory(finalres);
    })
    .catch((error)=>{
      console.log("error fetching data")
    });
  };
  const getProducts = () =>{
    axios.get('https://dummyjson.com/products')
    .then((prores)=>prores.data)
    .then((finalRes)=>{
      setFinalcategory(finalRes.products);
    })
    .catch((error)=>{
      console.log("error fetching data")
    });
  };

  useEffect(() => {
    getCategory();
    getProducts();
  }, []);

   useEffect(()=>{
    console.log("Selected category:",catName);
    if(catName !== ""){
      axios.get(`https://dummyjson.com/products/category/${catName}`)
      .then((prores)=>{
        console.log("Products response:", prores.data); // Log the API response
        setFinalproduct(prores.data.products);
      })
      .catch((error) => {
        console.error("Error fetching products by category:", error);
      });
  } else {
    getProducts(); // Fetch all products if no category is selected
  }
}, [catName]);

const startIndex = (currentPage - 1)*itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const displayedProduct = finalpro.slice(startIndex,endIndex)

const pitems = displayedProduct.map((product) => (
  <ProductItem key={product.id} pdata={product} />
));

const handelNextclick=()=>{
  setCurrentPage((prevpage)=>prevpage+1)
}
const handelPreviousclick=()=>{
setCurrentPage((prevpage)=>Math.max(prevpage-1,1));
}
    



  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
      <Navbar handleOrderPopup={handleOrderPopup} />
      <Hero handleOrderPopup={handleOrderPopup} />
      <Products />
      <TopProducts handleOrderPopup={handleOrderPopup} />
      <Banner />
      <Subscribe />
      <Testimonials />
      <Footer />
      <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
    </div>
  );
};

function ProductItem({ pdata }) {
  return (
    <><div className='shadow-lg text-center pb-4'>
      <img src={pdata.thumbnail} alt={pdata.title} className='w-[100%] h-[220px]' />
      <h3>{pdata.title}</h3>
      <b>Rs {pdata.price}</b>
    </div>
   
    </>
  );
}

export default App;
