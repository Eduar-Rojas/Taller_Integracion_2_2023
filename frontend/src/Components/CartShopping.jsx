import { useState, useEffect } from "react";
import Axios from 'axios';
import * as jwt_decode from "jwt-decode";
import sushi_img from './assets/img/sushicatalog.png'
import './assets/css/Radial_progress.css'
import { Link } from 'react-router-dom';

export const CartShopping = () => {

  const [cartsushiCarritos, setCartsushiCarritos] = useState([]); // Define cartsushiCarritos en el estado local del componente
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const resetLoadingProgress = () => {
    setLoadingProgress(0);
  };
  
  const handleFinishOrder = () => {
    resetLoadingProgress();
    // Muestra el modal
    const modal = document.getElementById('my_modal_4');
    modal.showModal();

    const interval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 500);

     // Simula una carga de 0% a 100% durante 5 segundos
    setTimeout(() => {
    clearInterval(interval);
    modal.close();

    setSuccessModalVisible(true);

    // Puedes restablecer el progreso de carga a 0 al finalizar
    setLoadingProgress(0);
      }, 5000);
    };

  useEffect(() => {
    // Obtener el token del localStorage
    const token = localStorage.getItem("token");

    // Verificar si el token existe
    if (token) {
      // Decodificar el token para obtener la información
      const decodedToken = jwt_decode.jwtDecode(token);

      // Extraer la ID de usuario del token decodificado
      const userId = decodedToken.id_usuario;

      // Realizar la solicitud al backend para obtener los datos del carrito
      Axios.get(`http://localhost:3000/api/carrito-compras/${userId}`)
        .then((response) => {
          setCartsushiCarritos(response.data);
        })
        .catch((error) => {
          console.error('Error al obtener datos del carrito desde Frontend: ', error);
        });
    } else {
      // Manejar el caso en el que el token no está presente en localStorage
      console.error('No se encontró el token en localStorage');
    }
  }, []);



    // Define un estado llamado productCount para que se le sume o reste 1, estando inicializado en 0
  const [productCount, setProductCount] = useState(0);

  // Define una función para incrementar el contador de productos
  const incrementCount = () => {
    setProductCount(productCount + 1);
  };
  
  // Define una función para decrementar el contador de productos
  const decrementCount = () => {
    if (productCount > 0) {
      setProductCount(productCount - 1);
    }
  };

  const removeFromCart = async (index) => {
    try {
      const updatedCart = [...cartsushiCarritos];
      const removedItem = updatedCart.splice(index, 1)[0]; // Elimina el elemento del carrito local y lo guarda
  
      // Hacer una solicitud al backend para eliminar el elemento del carrito en la base de datos
      await Axios.delete(`http://localhost:3000/api/carrito-compras/${removedItem.id_carrito}`);
  
      // Actualizar el estado local del carrito después de eliminarlo en la base de datos
      setCartsushiCarritos(updatedCart);
    } catch (error) {
      
      console.error('Error al eliminar producto del carrito:', error);
      
    }
  };


  return (
<div className="overflow-x-auto">
  <table className="table">
    <thead>
      <tr>
        <th className='text-2xl text-white'>Producto</th>
        <th className='text-2xl text-white'>Cantidad</th>
        <th className='text-2xl text-white'>Precio</th>
      </tr>
    </thead>
    <tbody>
      {/* Fila 1 */}
      {cartsushiCarritos.map((sushiCarrito, index)=>(
      <tr key={index} >
        <td>
          <div className="flex sushiCarritos-center space-x-3">
              <div className="mask mask-squircle">
                <img className='w-20 h-20' /*"src={}"*/ alt="Product"/>
              </div>
            <div>
              <div className="font-bold text-white">{sushiCarrito.nombrepro}</div>
            </div>
          </div>
        </td>
        <td>
            {/* Botones para aumentar o disminuir la cantidad del pedido*/}
            <button className="btn btn-sm text-white bg-black" onClick={decrementCount}> - </button>
            {/* productCount muestra la cantidad actual de productos */}
            <span className="mx-2 text-white font-bold p-2 rounded-lg"> {sushiCarrito.cantidad} </span>
            <button className="btn btn-sm text-white bg-black" onClick={incrementCount}> {console.log(incrementCount)} + </button>
        </td>
        <td className='text-white'>{sushiCarrito.precio }</td>
        {/* Apertura modal */}
        <th>
          <button className="btn btn-ghost btn-xs text-white" onClick={()=>document.getElementById('my_modal_3').showModal()}>Detalles del pedido</button>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
                <form method="dialog">
                {/* Este boton cierra el modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg text-center text-white">Sushi</h3>
                <figure className="px-10 pt-10 text-center">
                    <img src={sushi_img} alt="Product" className="rounded-xl mx-auto" />
                </figure>
                <p className="py-4 text-white"> {sushiCarrito.descpro} </p>
            </div>
          </dialog>
        </th>
        <th>
          <button className="btn btn-outline btn-error" onClick={() => removeFromCart(index)} >Eliminar</button>
        </th>
      </tr>
      ))}
    </tbody>
    <tfoot>
          <tr>
            <td colSpan="4"></td>
            <td className="flex justify-between">
            <button className="btn btn-success" onClick={handleFinishOrder}>Finalizar pedido</button>
              {/* modal*/}
              <dialog id="my_modal_4" className="modal">
                <div className="modal-box flex justify-center">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => {
                      document.getElementById('my_modal_4').close();
                      resetLoadingProgress();
                    }}
                    >✕</button>
                  </form>
                  <h3 className="font-bold text-lg text-center text-white p-10">Creando pedido</h3>
                    <div className="radial-progress mt-4" style={{ "--value": `${loadingProgress}%` }} role="progressbar">
                      {loadingProgress}%
                    </div>
                </div>
              </dialog>
              <dialog id="my_modal_5" className="modal" open={successModalVisible}>
                <div className="modal-box h-40">
                  <h3 className="font-bold text-lg text-center text-white p-4">¡Pedido creado con éxito!</h3>
                  <form method="dialog">
                  <Link to="/">
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        setSuccessModalVisible(false);
                      }}
                    >
                      Llévame al inicio
                    </button>
                  </Link>
                  </form>
                </div>
              </dialog>
            </td>
          </tr>
    </tfoot>       
  </table>
</div>
  )
}

