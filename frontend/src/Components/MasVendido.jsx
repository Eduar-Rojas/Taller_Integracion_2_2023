import React from 'react'
import sushi from './assets/img/sushi-ejemplo.png'

export const MasVendido = () => {
  return (
    <div className="grid grid-cols-2 grid-rows-1 gap-4 px-10">
        <div >
          <button style={{ backgroundImage: `url(${sushi})`, backgroundSize: 'cover', textShadow: '2px 5px 10px black'}} 
                  className='btn w-full h-96 text-white font-bold text-6xl hover:scale-95'>
            LO MAS VENDIDO
            </button>
        </div>
        <div >
          <button style={{ backgroundImage: `url(${sushi})`, backgroundSize: 'cover', textShadow: '2px 5px 10px black'}} 
                  className='btn w-full h-96 text-white font-bold text-6xl hover:scale-95'>VISTA PREVIA DEL CATÁLOGO</button>
          </div>
    </div>
    
  )
}
