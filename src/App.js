import "./App.css";
import Signup from "./components/signup";
import Signin from "./components/signin";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import AddProduct from "./components/addProduct";
import Products from "./components/products";
import Analytics from "./components/analytics";
import InvoiceHIstory from "./components/invoiceHIstory";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/addproduct' element={<AddProduct />} />
        <Route path='/products' element={<Products />} />
        <Route path='/analytics' element={<Analytics />} />
        <Route path='/invoice' element={<InvoiceHIstory />} />
      </Routes>
    </>
  );
}

export default App;
