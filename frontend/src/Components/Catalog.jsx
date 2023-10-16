import sushi_img from './assets/img/sushicatalog.png'
import { useState } from 'react'

export const Catalog = () => {
  const [productCount, setProductCount] = useState(0);

  const incrementCount = () => {
    setProductCount(productCount + 1);
  };
  
  const decrementCount = () => {
    if (productCount > 0) {
      setProductCount(productCount - 1);
    }
  };

  return (
    <div className="card w-[calc(25% - 20px)] bg-rojito shadow-xl m-5">
      <figure className="px-10 pt-10">
          <img src={sushi_img} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center text-white">
        <h2 className="card-title font-bold">Sushi</h2>
        <p className='font-light'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        <div className="card-actions">
          <button className="btn text-white bg-black" onClick={()=>document.getElementById('my_modal_1').showModal()}>Añadir al carrito</button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box bg-rojito">
              <h3 className="font-bold text-lg">Sushi</h3>
              <figure className="px-10 pt-10">
                <img src={sushi_img} alt="Shoes" className="rounded-xl" />
              </figure>
              <p className="py-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              <h3 className="font-bold text-lg text-left">Instrucciones especiales:</h3>
              <textarea className="textarea textarea-bordered w-64 text-black" placeholder="Coloca una nota"></textarea>
              <div className="modal-action">
                <div className="add-cart flex items-center justify-between">
                  <div className="ml-2 flex items-center">
                    <button className="btn btn-sm text-white bg-black" onClick={decrementCount}> - </button>
                    <span className="mx-2 text-white font-bold p-2 rounded-lg"> {productCount} </span>
                    <button className="btn btn-sm text-white bg-black" onClick={incrementCount}> + </button>
                  </div>
                  <button className="btn bg-black text-white">Agregar</button>
                  <p className='font-bold text-3xl'>$200</p>
                </div>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  )
}
