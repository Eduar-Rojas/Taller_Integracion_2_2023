import React from 'react';
import { CartShopping } from "../Components/CartShopping";
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";

function Carro () {
  return (
    <div className="grid grid-cols-5 gap-4 bg-[#161a1d]">
      <div className="col-span-5">
        <Header/>
      </div>

      <div className="col-span-5">
        <CartShopping/>
      </div>
      <div className="col-span-5">
        <Footer/>
      </div>
    </div>
    );
}

export default Carro;
