import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Journal from "./pages/Journal/Journal";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import Admin from "./pages/Admin/Admin";
import UserGestions from "./components/Admin/UserGestions/UserGestions"
import ProductGestions from './components/Admin/ProductGestions/ProductGestions'
import LayoutUnAuthorized from "./layout/LayoutUnAuthorized";
import LayoutAuthorizedAdmin from "./layout/LayoutAuthorizedAdmin";
import LayoutAuthorizedClient from "./layout/LayoutAuthorizedClient";
import ProductTable from "./components/Admin/Orders/ProductTable";
import Favorites from "./pages/Favorites/Favorites";
const Layout = () => {
  return (
    <div>
      <Header />
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<LayoutAuthorizedClient><Layout /></LayoutAuthorizedClient>}>
        {/* ==================== Header Navlink eto tolotra =================== */}
        
        <Route index element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/journal" element={<Journal />}></Route>
        {/* ==================== Header Navlink fin eto ===================== */}
        <Route path="/offer" element={<Offer />}></Route>
        <Route path="/produit/:_id" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/favorite" element={<Favorites />}></Route>
        <Route path="/paymentgateway" element={<Payment />}></Route>
      </Route>
      <Route path="/admin" element={<LayoutAuthorizedAdmin><Admin/></LayoutAuthorizedAdmin>}>
           <Route path="/admin/gestion-user" element={<UserGestions/>}/>
           <Route path="/admin/gestion-product" element={<ProductGestions/>}/>
           <Route path="/admin/orders" element={<ProductTable/>}/>
      </Route>

        <Route path="/signup" element={<LayoutUnAuthorized><SignUp /></LayoutUnAuthorized>}></Route>
        <Route path="/signin" element={<LayoutUnAuthorized><SignIn /></LayoutUnAuthorized>}></Route>
    </Route>
  )
);

function App() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
