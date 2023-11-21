import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";
import { Admin } from "../Components/Admin";


function AdminPedidos () {
    return (
        <div className="grid grid-cols-5 gap-4 bg-black">
      <div className="col-span-5">
        <Header />
      </div>

      <div className="col-span-5 flex justify-end">
        <div className="join gap-1 px-4">
          <div>
            <div>
              <input className="input input-bordered join-item text-black" placeholder="Buscar" style={{ height: '3rem' }}/>
            </div>
          </div>
          <select className="select select-bordered join-item text-white font-medium">
            <option disabled selected>
              Ordenar
            </option>
            <option>Mas Reciente</option>
            <option>Atrasado</option>
            <option>Orden Alfabético</option>
          </select>
          <div className="indicator">
            <button className="btn join-item text-white hover:bg-rojito">Buscar</button>
          </div>
        </div>
      </div>

      <div className="col-span-5 p-10">
        <Admin/>
      </div>

      <div className="col-span-5">
        <Footer/>
      </div>
    </div>
    )
}

export default AdminPedidos;
