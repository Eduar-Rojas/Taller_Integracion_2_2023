import React,{useState} from 'react'
import sushi_img from './assets/img/sushicatalog.png'

export const CartShopping = () => {

  const [cartItems, setCartItems] = useState([]); // Define cartItems en el estado local del componente

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

  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
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
      {cartItems.map((item, index)=>(
      <tr key={index} >
        <td>
          <div className="flex items-center space-x-3">
              <div className="mask mask-squircle">
                <img className='w-20 h-20' src={item.product.img} alt="Product"/>
              </div>
            <div>
              <div className="font-bold text-white">{item.product.nombre_producto}</div>
            </div>
          </div>
        </td>
        <td>
            {/* Botones para aumentar o disminuir la cantidad del pedido*/}
            <button className="btn btn-sm text-white bg-black" onClick={decrementCount}> - </button>
            {/* productCount muestra la cantidad actual de productos */}
            <span className="mx-2 text-white font-bold p-2 rounded-lg"> {item.quantity} </span>
            <button className="btn btn-sm text-white bg-black" onClick={incrementCount}> + </button>
        </td>
        <td className='text-white'>{`$${item.product.precio * item.quantity}`}</td>
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
                <p className="py-4 text-white">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
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
              <button className="btn btn-success">Finalizar pedido</button>
            </td>
          </tr>
    </tfoot>       
  </table>
</div>
  )
}

