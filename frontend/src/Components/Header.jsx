import { useState, useEffect } from 'react';
import logo from './assets/img/Logo.png'
import carrito from './assets/img/carrito.svg'
import { Link } from 'react-router-dom';
import {useAuth} from './useAuth';

export const Header = () => {
  const {user, logout, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    // Llama a la función logout para cerrar sesión
    logout();

  };


  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="navbar bg-rojito flex items-center gap-4">
      <div className="w-24 flex items-center justify-start ">
        <Link to="/">
          <button>
            <img src={logo} className='sm:w-32 md:w-48 lg:w-64 rounded-sm' alt="Logo" />
          </button>
        </Link>
      </div>
      <div className="flex-grow justify-center">
        <ul className="btn-group btn-group-vertical lg:btn-group-horizontal px-1 gap-14 font-bold text-xl flex justify-end items-center ">
          <li>
            <Link to="/catalogo">
              <button className="lg:px-1.25 lg:py-0.5 btn text-white bg-black w-36">
                Catálogo
              </button>
            </Link>
          </li>
          <li><Link to="/personalizarSushi"><button className="lg:px-1.25 lg:py-0.5 btn text-white bg-black">Personaliza tu pedido</button></Link></li>
          {isAuthenticated() ? (
            <>
            <li><Link to="/profile"><button className="lg:px-1.25 lg:py-0.5 btn text-white bg-black w-36">Perfil</button></Link></li>
            <li><Link to="/"><button onClick={handleLogout} className="lg:px-1.25 lg:py-0.5 btn text-white bg-black">Cerrar Sesión</button></Link></li>
            </>
          ) : (
            <>
              <li><Link to="/login"><button className="lg:px-1.25 lg:py-0.5 btn text-white bg-black ">Iniciar Sesión</button></Link></li>
            </>
          )}
          <li><Link to="/carro"><button className="lg:px-1.5 lg:py-0.5 hover:bg-black hover:rounded"><img src={carrito} className='w-10' alt="Carrito" /></button></Link></li>
        </ul>
      </div>
    </div>
  );
};
