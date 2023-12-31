import { Catalog } from "../Components/Catalog";
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";

function Catalogo() {
  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="col-span-5">
        <Header />
      </div>

      <div className="col-span-5">
        <div className="join gap-1 px-4">
          <div>
            <div>
              <input className="input input-bordered join-item" placeholder="Buscar" style={{ height: '3rem' }}/>
            </div>
          </div>
          <select className="select select-bordered join-item text-white font-medium">
            <option disabled selected>
              Filtro
            </option>
            <option>Comida</option>
            <option>Comer</option>
            <option>Aaaaa</option>
          </select>
          <div className="indicator">
            <button className="btn join-item bg-black text-white hover:bg-rojito">Buscar</button>
          </div>
        </div>
      </div>

      <div className="col-span-5 grid grid-cols-5 gap-4 pt-4">
        <Catalog/>
        <Catalog/>
        <Catalog/>
        <Catalog/>
        <Catalog/>
        <Catalog/>
        <Catalog/>
      </div>

      <div className="col-span-5">
        <Footer/>
      </div>
    </div>
  );
}

export default Catalogo;
