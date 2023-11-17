
import React from 'react';
import ReactDOM from 'react-dom/client'

import imgp from '../Components/assets/img/imgp.jpg'
export const Perfil = () =>  {
  return (
    <div>
   
      {/* Contenedor del formulario */}
      <div className=" p-4">
        <div className="container mx-auto">
          <div className="flex ">

          <div className="w-3/6 p-4 bg-white rounded-lg shadow-md pr-4 mr-1.5">

              <div className="text-center  ">
                 <img src={imgp} alt="#" className="w-32 h-32 mx-auto rounded-full mb-4" />
                <h1 className="text-xl font-bold">Nombre</h1>
                <p className="text-base">Apellido</p>
                <p>Numero telefónico</p>
              </div>
            </div>

            <div className="  p-4 bg-white shadow-md  " >
              <h2 className="text-2xl  text-center">Perfil de usuario</h2>

              <div className='w-3/4 mx-auto mt-6'>      
                 {/* Formulario */}
              <form action="#"  className='space-x-4'  >
                <div className='flex flex-wrap '>    
                <div className="w-1/2 pr-2 ">
                  <label htmlFor=""><i className="fa fa-user"></i> Nombre:</label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded" />
                </div>

                <div className="w-1/2  pl-2">
                  <label htmlFor="">Apellido:</label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded" />
                </div>

                <div className="mb-4">
                  <label htmlFor="">Número Telefónico:</label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded" />
                </div>

                <div className="mb-4">
                  <label htmlFor="">Correo:</label>
                  <input type="email" className="w-full p-2 border border-gray-300 rounded" />
                </div>

                <div className="mb-4">
                  <label htmlFor="">Dirección:</label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded" />
                </div>

                <div className="mb-4">
                  <label htmlFor="">Fecha de Nacimiento:</label>
                  <input type="date" className="w-full p-2 border border-gray-300 rounded" />
                </div>

                <div className="text-right">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Actualizar
                  </button>
                  <button
                    type="reset"
                    className="bg-gray-500 text-white px-4 py-2 rounded ml-2 hover:bg-gray-600"
                  >
                    Cancelar
                  </button>
                </div>
                </div>
              </form>
         
                
               </div>
             
            </div>

           
          </div>
        </div>
      </div>
      
    </div>
  );
}



