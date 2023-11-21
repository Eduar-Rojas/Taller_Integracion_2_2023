import { useState, useEffect } from "react";
import axios from "axios";



const Profile_Body = () => {
  const [userData, setUserData] = useState({ id_usuario: '', email: '' });
  const [sushiList, setSushiList] = useState([]);


  const fetchUserData = async () => {
    try {
      const respuesta = await axios.get('http://localhost:3000/datos-usuario', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUserData(respuesta.data.usuario);
      
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }
  };

  const fetchUpdatedUserData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/datos-usuario', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUserData(response.data.usuario);
    } catch (error) {
      console.error('Error al obtener datos del usuario actualizados:', error);
    }
  };

  useEffect(() => {
    fetchUserData(); // Se ejecuta solo una vez después de montar el componente
  }, []);

  const handleSaveClick = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/actualizar-datos',
        {
          id_usuario: userData.id_usuario,
          email: userData.email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      console.log('Mensaje exitoso de actualización de perfil', response.data.usuario);

      // Llama a la función para obtener los datos actualizados y actualizar el estado
      fetchUpdatedUserData();


    } catch (error) {
      console.error('Error al actualizar el perfil de usuario:', error);
    }
  };

  useEffect(() => {
    fetchUserData(); // Se ejecuta solo una vez después de montar el componente
  }, []);

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete('http://localhost:3000/borrar-cuenta', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log('Mensaje exitoso al borrar la cuenta:', response.data);

      
    } catch (error) {
      console.error('Error al borrar la cuenta:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get("http://localhost:3000/api/mandar-carrito-compras/:id_usuario", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      setSushiList(response.data);
    })
    .catch((error) => {
      console.error('Error al solicitar datos al api desde Frontend: ', error);
    });
   }, []);
  
  return (
    <main>
      <div className="grid grid-cols-2 grid-rows-1 gap-4 justify-items-stretch mb-64">
        <div className="justify-self-end">
          <h1 className="flex justify-center">Historial</h1>
          {/* ... (tu tabla de historial) */}
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>N° Pedido</th>
                  <th>Pedido</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
              {sushiList.map((item, index) => (
   <tr key={index}>
     <td>{item.id_producto}</td>
     <td>{item.nombrepro}</td>
     <td>{item.precio}</td>
   </tr>
 ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="justify-self-start text-white">
          <h1 className="flex justify-center">Tus datos</h1>
          <form action="#" className='space-x-4'  >
            <div className=''>
              <div className="mb-4">
                <label htmlFor=""><i className="fa fa-user"></i> Nombre:</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded" value={userData.id_usuario} onChange={(e) => setUserData({ ...userData,id_usuario : e.target.value })}  onBlur={() => fetchUpdatedUserData()}  />
              </div>
              <div className="">
                <label htmlFor="">Correo:</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={userData.email}
          
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  
                />
              </div>
              <div className="text-right pt-6">
              <button
                  type="button"
                  className="bg-rojito text-white px-4 py-2 rounded hover:outline-double outline-rojito"
                  onClick={handleSaveClick}
                >
                  Actualizar
                </button>
                <button
                  type="button"
                  className="bg-red-800 text-white px-4 py-2 rounded ml-2 hover:outline-double outline-rojito"
                  onClick={handleDeleteAccount}
                >
                  Borrar Cuenta 💀
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Profile_Body;