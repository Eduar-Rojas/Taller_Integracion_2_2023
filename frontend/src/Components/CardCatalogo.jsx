import { useState, useEffect } from "react";
import Axios from 'axios';
import sushi_imgFile from './assets/img/sushicatalog.png'
import * as jwt_decode from "jwt-decode";

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
    }, []);


  const addToCart = (selectedProduct, quantity) => {

      // Obtener el token del localStorage
  const token = localStorage.getItem("token") // Reemplaza 'userToken' con el nombre de tu clave de token
  
  // Decodificar el token para obtener la información del usuario
  const decodedToken = jwt_decode.jwtDecode(token); // Asegúrate de importar jwt_decode si no lo has hecho
  console.log(decodedToken);

  // Obtener el ID de usuario desde el token decodificado
  const userId = decodedToken.id_usuario; // Reemplaza 'id_usuario' con la clave adecuada en tu token


    // Aquí debes hacer la solicitud POST al endpoint correspondiente para agregar productos al carrito
    Axios.post("http://localhost:3000/api/agregar-al-carrito", {
      id_usuario: userId, // Reemplaza con el ID real del usuario
      id_producto: selectedProduct.id_producto,
      cantidad: quantity,
    })

    

// nombrepre: sushi.nombre_producto,
// descpro: sushi.descripcion,
// precio: sushi.precio




      .then((response) => {
        console.log("Producto agregado al carrito:", response.data);
        // Puedes manejar la lógica de actualización de estado aquí si lo necesitas
      })
      .catch((error) => {
        console.error("Error al agregar producto al carrito:", error);
        // Maneja los errores si es necesario
      });
    closeModal();
  };


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
    <div className="grid grid-cols-4">
      {sushiList.map((sushi) => (
        <div key={sushi.id_producto} className="card w-[calc(25% - 20px)] bg-rojito shadow-xl m-5 mx-20">
          <figure className="px-10 pt-10">
            <img src={sushi.img} alt={"Imagen de: " + sushi.nombre_producto} className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center text-white">
            <h2 className="card-title font-bold">{sushi.nombre_producto}</h2> {/*Nombre del producto */}
            <p className='font-light'>{sushi.descripcion}</p> {/*Descripcion del producto */}
            <div className="card-actions">
              {/*Lo siguiente es un boton con la funcion onClick para que aparezca el modal */}
              <button className="btn text-white bg-black" onClick={() => openModal(sushi.id_producto)}>Ver producto</button>

              {/*Modal:   */}
              <dialog id={`my_modal_${sushi.id_producto}`} className="modal" open={modalOpen === sushi.id_producto} onClose={closeModal}>
                <div className="modal-overlay fixed inset-0 bg-black opacity-70"></div>
                <div className="modal-box bg-rojito">
                  <h3 className="font-bold text-lg">{sushi.nombre_producto}</h3>
                  <figure className="px-10 pt-10">
                    <img src={sushi.img} alt="Shoes" className="rounded-xl" />
                  </figure>
                  <p className="py-4">{sushi.descripcion}</p>
                  <h3 className="font-bold text-lg text-left">Instrucciones especiales:</h3>
                  <textarea className="textarea textarea-bordered w-64 text-white" placeholder="Coloca una nota"></textarea>
                  <div className="modal-action">
                    <div className="add-cart flex items-center justify-between">
                      <div className="ml-2 flex items-center">
                      <button className="btn bg-black text-white" onClick={closeModal}>Cerrar</button>
                        {/* Botones para aumentar o disminuir la cantidad del pedido*/}
                        <button className="btn btn-sm text-white bg-black" onClick={decrementCount}> - </button>
                        <span className="mx-2 text-white font-bold p-2 rounded-lg"> {productCount} </span>
                        <button className="btn btn-sm text-white bg-black" onClick={incrementCount }> + </button>
                      </div>
                      <button className="btn bg-black text-white" onClick={() => addToCart(sushi, productCount)} >Añadir al carrito</button>
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
