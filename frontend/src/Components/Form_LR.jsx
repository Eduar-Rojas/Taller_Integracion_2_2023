import { useState , useEffect} from 'react'
import Axios from 'axios'
import './assets/css/Form_LR.css'
import user_icon from './assets/img/usuario.png'
import email_icon from './assets/img/email.png'
import password_icon from './assets/img/contraseña.png'
import logo from './assets/img/Logo.png'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator';

 


export const Form_LR = () => {

    const [userData,setUserData] = useState(null); 
    const[action,setAction] = useState("Registrar");


    //useState :administra  estados 
/*  formulario:variable de estado,dentro de el estan 
      *nombre
      *correo
      *contrasena
      esto son campos de entrda y se inicializan en cero

*/
    
//obtnerfomulario :la funcion que permite actualizar a formulario
const [formulario,obtenerformulario]=useState({
    user:'',
    email:'',
    pass:'',
});

// se crea la variable token y setToken para actualizar su estado
const [token, setToken] = useState(localStorage.getItem('token') || '');

useEffect(() => {
// Se almacena el token en el estado cuando cambia en localStorage
  setToken(localStorage.getItem('token') || '');
}, []);



/*la funcion btoninput hace que cunado el usuario ingresa sus datos,va a estar actualizando el valor del campo
 cuando se dispara esta funcion en el input del formulario,con e.target se extraen la propiedad name(se identifica
   el campo con un nombre) y el value(el valor actual del campo) */
const btoninput=(e)=>{
    const{name,value}=e.target;
    obtenerformulario({//aqui se usa la funcion obtnerfomrulario para actualizar el estado formulario
        ...formulario,// ...formulario  ,eso significa  que  toma  todos los campos de entrada 
        [name]:value,
    });
};



    const enviar = async (e) => {
        e.preventDefault();
        //mensaje de  alerta para que cuando se registre  correo sea correcto 
    if (!validator.isEmail(formulario.email)) {
        toast.error('Introduzca un correo electrónico válido', {
          position: 'top-right',
          autoClose: 5000,
        });
        return;
      }
        //validar nombre si esta vacio 
    if (formulario.user.trim()===""  ){
        toast.error('Nombre esta vacio ', {
            position: 'top-right',
            autoClose: 5000,
        });
    return
    }
        // validar nombre  que  ademas sea solo letras ,no se permiten numeros
    if (!/^[A-Za-z]+$/.test(formulario.user)) {
        toast.error('Introduzca un nombre válido (solo letras)', {
            position: 'top-right',
            autoClose: 5000,
        });
        return;
    }

    //validar contraseña
    if(formulario.pass.length<5){
        toast.error('Introduzca  una contraseña minimo 5 caracteres',{ 
        position: 'top-right',
        autoClose:5000,
    });
    return
 }

 
    try{
      // se hace una solicitud post a dicha url  con los datos del formulario
        const respuesta=await Axios.post('http://localhost:3000/registro',formulario);
        if( respuesta.status===200){//respuesta de estado del servidor
            toast.success('Registro exitoso', {//mensaje de alerta en la parte superior derecha 
                position: 'top-right', 
                autoClose: 5000, // dura 5segundos
              });
            localStorage.setItem('token', respuesta.data.token); // Almacena el token en localStorage
            setToken(respuesta.data.token); // actualiza el estado del token y se envia de vuelta al cliente(frontend)
            }
       
    }catch(error){
        toast.error('Error en el registro', {
            position: 'top-right',
            autoClose: 5000,
          });
        console.error('error en el registro',error);

        }
    }

    const enviarSesion = async (e) => {
        e.preventDefault();

        try {
            const respuesta = await Axios.post('http://localhost:3000/login', formulario);
            if (respuesta.status === 200) {
                toast.success('Inicio de sesion exitoso', {//mensaje de alerta en la parte superior derecha 
                    position: 'top-right', 
                    autoClose: 5000, // dura 5segundos
                  });
                  localStorage.setItem('token', respuesta.data.token);
                  setToken(respuesta.data.token);
                  setUserData(respuesta.data.usuario);
                  console.log('Inicio de sesión exitoso');
                  // Aquí podrías redirigir al usuario a otra página después del inicio de sesión exitoso
                
            
            }
        } catch (error) {

            toast.error('Error en el inicio de sesión', {//mensaje de alerta en la parte superior derecha 
                position: 'top-right', 
                autoClose: 5000, // dura 5segundos
              });

            console.error('Error en el inicio de sesión', error);
        }
    };


  return (
    <div className="outer-container pb-4">
    <div className='container'>

        <div className='header'>
            <Link to="/">
                <button className=' font-bold bg-white text-black w-36 h-10 rounded-3xl hover:bg-[#49424e] hover:text-white'>
                    VOLVER
                </button>
            </Link>
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>
        <form onSubmit={action === 'Registar' ? enviar : enviarSesion} >
            <div className="inputs">
                {action === "Iniciar Sesión" ? <div></div> : <div className="input">
                    <img src={user_icon} alt="" />
                    <input type="text" placeholder='Nombre' name='user' value={formulario.user} onChange={btoninput} required />
                </div>}

                <div className="input">
                    <img src={email_icon} alt="" />
                    <input type="email" placeholder='Correo electrónico' name='email' value={formulario.email} onChange={btoninput} required />
                </div>
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder='Contraseña' name='pass' value={formulario.pass} onChange={btoninput} required />
                </div>
                {action === "Registrar" ? <div></div> : <div className="forgot-password"><strong>¿Perdiste tu contraseña?</strong> <span>Presiona aquí</span></div>}
                <div className="submit-container">
                    <button type="submit" className={action === 'Iniciar Sesión' ? 'submit active' : 'submit'} onClick={(e) => { setAction('Registrar'); enviar(e); }}>Registrar</button>
                    <button className={action === 'Registrar' ? 'submit active' : 'submit'} onClick={(e) => { setAction('Iniciar Sesión'); enviarSesion(e); }}>Iniciar Sesión</button>
                </div>
            </div>
        </form>

    </div>

      
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
    
    
    />
    </div>
  )
}