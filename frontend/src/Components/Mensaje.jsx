import React from 'react'

export const Mensaje = () =>{
  return (
    <div className='grid grid-cols-2 grid-rows-1 justify-center px-10 w-screen'>
        <div className='flex items-center text-3xl font-bold text-white'>
            ¿QUIERES ARMAR TU PROPIO PEDIDO?
        </div>
        <div className='flex items-center text-3xl btn'>
            <button>CLICK AQUÍ!!</button>
        </div>
        
    </div>
  )
}
