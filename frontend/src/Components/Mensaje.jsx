import { Link } from 'react-router-dom';

export const Mensaje = () =>{
  return (
    <div className='grid grid-cols-2 grid-rows-1 justify-center px-10 w-screen'>
        <div className='flex items-center text-3xl font-bold text-white'>
            ¿QUIERES ARMAR TU PROPIO SUSHI?
        </div>
        <div className='flex items-center text-3xl btn bg-black'>
            <Link to="/personalizarSushi"><button><p className='text-white'>CLICK AQUÍ!!</p></button></Link>
        </div>
        
    </div>
  )
}
