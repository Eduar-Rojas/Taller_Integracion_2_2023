import sushi_img from './assets/img/sushicatalog.png'

export const Catalog = () => {
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
          <h3 className="font-bold text-lg">Lorem</h3>
          <p className="py-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn bg-black text-white">Cerrar</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  </div>
</div>
  )
}