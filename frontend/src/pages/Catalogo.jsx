import {useState, useEffect} from "react";
import { CardCatalogo } from "../Components/CardCatalogo";
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";

function Catalogo() {
  return (
    <div className="grid grid-cols-5 gap-4 bg-black">
      <div className="col-span-5">
        <Header />
      </div>

      <div className="col-span-5">
        <div className="join gap-1 px-4">
          <div>
            <div>
              <input className="input input-bordered join-item text-black" placeholder="Buscar" style={{ height: '3rem' }}/>
            </div>
          </div>
          <select className="select select-bordered join-item text-white font-medium">
            <option disabled selected>
              Filtrar
            </option>
            <option>Kanikama</option>
            <option>Pollo</option>
            <option>Camaron</option>
          </select>
          <div className="indicator">
            <button className="btn join-item text-white hover:bg-rojito">Buscar</button>
          </div>
        </div>
      </div>

      <div className="col-span-5">
        <CardCatalogo/>
      </div>

      <div className="col-span-5">
        <Footer/>
      </div>
    </div>
  );
}

export default Catalogo;
