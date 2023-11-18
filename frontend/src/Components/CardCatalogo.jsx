import { useState, useEffect } from "react";
import Axios from 'axios';

export const CardCatalogo = () => {
  const [sushiList, setSushiList] = useState([]);
  const [modalOpen, setModalOpen] = useState(null);
  const [productCount, setProductCount] = useState(1);

  useEffect(() => {
    Axios.get("http://localhost:3000/api/catalogo")
      .then((response) => {
        setSushiList(response.data);
      })
      .catch((error) => {
        console.error('Error al solicitar datos al catálogo api desde Frontend: ', error);
      });
  });

  const openModal = (productId) => {
    setModalOpen(productId);
    setProductCount(1);
  };

  const closeModal = () => {
    setModalOpen(null);
  };

  const incrementCount = () => {
    setProductCount((prevCount) => prevCount + 1);
  };

  const decrementCount = () => {
    if (productCount > 1) {
      setProductCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <div>
      {sushiList.map((sushi) => (
        <div key={sushi.id_producto} className="card w-[calc(25% - 20px)] bg-rojito shadow-xl m-5">
          <figure className="px-10 pt-10">
            <img src={sushi.img} alt={"Imagen de: " + sushi.nombre_producto} className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center text-white">
            <h2 className="card-title font-bold">{sushi.nombre_producto}</h2> {/*Nombre del producto */}
            <p className='font-light'>{sushi.descripcion}</p> {/*Descripcion del producto */}
            <div className="card-actions">
              {/*Lo siguiente es un boton con la funcion onClick para que aparezca el modal */}
              <button className="btn text-white bg-black" onClick={() => openModal(sushi.id_producto)}>Añadir al carrito</button>

              {/*Modal:   */}
              <dialog id={`my_modal_${sushi.id_producto}`} className="modal" open={modalOpen === sushi.id_producto} onClose={closeModal}>
                <div className="modal-box bg-rojito">
                  <h3 className="font-bold text-lg">{sushi.nombre_producto}</h3>
                  <figure className="px-10 pt-10">
                    <img src={sushi.img} alt="Shoes" className="rounded-xl" />
                  </figure>
                  <p className="py-4">{sushi.descripcion}</p>
                  <h3 className="font-bold text-lg text-left">Instrucciones especiales:</h3>
                  <textarea className="textarea textarea-bordered w-64 text-black" placeholder="Coloca una nota"></textarea>
                  <div className="modal-action">
                    <div className="add-cart flex items-center justify-between">
                      <div className="ml-2 flex items-center">
                      <button className="btn bg-black text-white" onClick={closeModal}>Cerrar</button>
                        {/* Botones para aumentar o disminuir la cantidad del pedido*/}
                        <button className="btn btn-sm text-white bg-black" onClick={decrementCount}> - </button>
                        <span className="mx-2 text-white font-bold p-2 rounded-lg"> {productCount} </span>
                        <button className="btn btn-sm text-white bg-black" onClick={incrementCount }> + </button>
                      </div>
                      <button className="btn bg-black text-white">Agregar</button>
                      <p className='font-bold text-3xl'>{`$${sushi.precio * productCount}`}</p>
                    </div>
                  </div>
                </div>
              </dialog>
              {/*Fin Modal*/}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
