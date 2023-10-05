// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import '../Components/assets/css/LoginRegister.css'
import user_icon from '../Components/Assets/img/usuario.png'
import email_icon from '../Components/Assets/img/email.png'
import password_icon from '../Components/Assets/img/contraseña.png'
import logo from '../Components/assets/img/Logo.png'
import { Link } from 'react-router-dom';

export const LoginRegister = () => {

    const[action,setAction] = useState("Registrar");

  return (
    <div className="outer-container">
        <div className="logo-container">
            <img src={logo} alt="" className='logo'/>
        </div>
    <div className='container'>
        <div className='header'>
            <button className=' font-bold bg-white text-black w-36 h-10 rounded-3xl hover:bg-black hover:text-white'>
                <Link to="/">VOLVER</Link>
            </button>
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
            {action==="Iniciar Sesión"?<div></div>:<div className="input">
                <img src={user_icon} alt="" />
                <input type="text" placeholder='Nombre'/>
            </div>}

            <div className="input">
                <img src={email_icon} alt="" />
                <input type="email" placeholder='Correo electrónico'/>
            </div>
            <div className="input">
                <img src={password_icon} alt="" />
                <input type="password" placeholder='Contraseña'/>
            </div>
            {action==="Registrar"?<div></div>:<div className="forgot-password"><strong>¿Perdiste tu contraseña?</strong> <span>Presiona aquí</span></div>}
            <div className="submit-container">
                <div className={action==="Iniciar Sesión"?"submit active":"submit"} onClick={()=>{setAction("Registrar")}}>Registrar</div>
                <div className={action==="Registrar"?"submit active":"submit"}onClick={()=>{setAction("Iniciar Sesión")}}>Iniciar Sesión</div>
            </div>
        </div>
    </div>
    </div>
  )
}
