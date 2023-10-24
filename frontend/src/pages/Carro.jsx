import { CartShopping } from "../Components/CartShopping";
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";

function Carro () {
  return (
    <div className="grid grid-cols-5 gap-4 bg-black">
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
