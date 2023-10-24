import {useState, useEffect} from "react";
import axios from "axios";

const Profile_Body = () => {

  const [userData, setUserData] = useState({id_usuario: '' , email: ''}) ;

  useEffect(() => {
    const fetchUserData = async() => {
      try{
        const respuesta=await axios.get('http://localhost:3000/datos-usuario',{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUserData(respuesta.data.usuario);
      } catch(error){
        console.error('Error al obtener datos del usuario:', error);
      }
    }
    fetchUserData();  // Se ejecuta solo una vez despues de montar el componente 
}, []);

  return (
    <main>

      <div className="grid grid-cols-2 grid-rows-1 gap-4 justify-items-stretch mb-64">

        <div className="justify-self-end">
          <h1 className="flex justify-center">Historial</h1>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Pedido</th>
                  <th>Fecha</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Blue</td>
                </tr>
                {/* row 2 */}
                <tr>
                  <th>2</th>
                  <td>Hart Hagerty</td>
                  <td>Desktop Support Technician</td>
                  <td>Purple</td>
                </tr>
                {/* row 3 */}
                <tr>
                  <th>3</th>
                  <td>Brice Swyre</td>
                  <td>Tax Accountant</td>
                  <td>Red</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div  className="justify-self-start text-white ">
          <h1 className="flex justify-center">Tus datos</h1>
          <form action="#" className='space-x-4'  >
            <div className=''>
              <div className="mb-4 ">
                <label htmlFor=""><i className="fa fa-user"></i> Nombre:</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded" value={userData.id_usuario} /> 
              </div>

              <div className="">
                <label htmlFor="">Correo:</label>
                <input type="email" className="w-full p-2 border border-gray-300 rounded" value={userData.email} />
              </div>
              <div className="text-right pt-6">
                <button
                  type="submit"
                  className="bg-rojito text-white px-4 py-2 rounded hover:outline-double outline-rojito"
                >
                  Actualizar
                </button>
                <button
                  type="reset"
                  className="bg-gray-500 text-white px-4 py-2 rounded ml-2 hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  type=""
                  className="bg-red-800 text-white px-4 py-2 rounded ml-2 hover:outline-double outline-rojito"
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