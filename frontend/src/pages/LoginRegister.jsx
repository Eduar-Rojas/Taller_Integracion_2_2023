import React, { useState } from 'react'
import '../Components/assets/css/LoginRegister.css'
import user_icon from '../Components/assets/img/usuario.png'
import email_icon from '../Components/assets/img/email.png'
import password_icon from '../Components/assets/img/contraseña.png'
import logo from '../Components/assets/img/Logo.png'
import { Link } from 'react-router-dom';
import Axios from 'axios'

export const LoginRegister = () => {

    const [action, setAction] = useState("Registrar");


    const [formulario, obtenerformulario] = useState({
        nombre: '',
        correo: '',
        contrasena: '',
    })


    const btoninput = (e) => {
        const { name, value } = e.target;
        obtenerformulario({
            ...formulario,
            [name]: value,
        });
    };


    const enviar = async (e) => {
        e.preventDefault();

        try {
            const respuesta = await Axios.post('http://localhost:3000/registro', formulario);
            if (respuesta.status === 200) {
                console.log('registro exitoso');
            }
        } catch (error) {
            console.error('error en el registro', error);

        }
    }

    const enviarSesion = async (e) => {
        e.preventDefault();

        try {
            const respuesta = await Axios.post('http://localhost:3000/inicio-sesion', formulario);
            if (respuesta.status === 200) {
                console.log('Inicio de sesión exitoso');
                // Aquí podrías redirigir al usuario a otra página después del inicio de sesión exitoso
            }
        } catch (error) {
            console.error('Error en el inicio de sesión', error);
        }
    };



    return (
        <div className="outer-container">
            <div className="logo-container">
                <img src={logo} alt="" className='logo' />
            </div>
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
                            <input type="text" placeholder='Nombre' name='nombre' value={formulario.nombre} onChange={btoninput} required />
                        </div>}

                        <div className="input">
                            <img src={email_icon} alt="" />
                            <input type="email" placeholder='Correo electrónico' name='correo' value={formulario.correo} onChange={btoninput} required />
                        </div>
                        <div className="input">
                            <img src={password_icon} alt="" />
                            <input type="password" placeholder='Contraseña' name='contrasena' value={formulario.contrasena} onChange={btoninput} required />
                        </div>
                        {action === "Registrar" ? <div></div> : <div className="forgot-password"><strong>¿Perdiste tu contraseña?</strong> <span>Presiona aquí</span></div>}
                        <div className="submit-container">
                            <button type="submit" className={action === 'Iniciar Sesión' ? 'submit active' : 'submit'} onClick={(e) => { setAction('Registrar'); enviar(e); }}>Registrar</button>
                            <button className={action === 'Registrar' ? 'submit active' : 'submit'} onClick={(e) => { setAction('Iniciar Sesión'); enviarSesion(e); }}>Iniciar Sesión</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}