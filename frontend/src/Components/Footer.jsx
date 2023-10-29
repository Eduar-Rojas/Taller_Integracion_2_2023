import './assets/css/Footer.css'
import fb from './assets/img/facebook.png'
import twitter from './assets/img/twitter.png'
import instagram from './assets/img/instagram.png'
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <div className="footer">
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
        <nav className="grid grid-flow-col gap-4">
            <Link to="/nosotros"><h4 className='hover:text-white'>Sobre nosotros</h4></Link> 
            <Link to="/contacto"><h4 className='hover:text-white'>Contáctanos</h4></Link> 
            <a className="link link-hover">Trabaja con nosotros</a> 
        </nav> 
        <nav>
            <div className="grid grid-flow-col gap-4">
                <a href='https://www.facebook.com/' className="fill-current w-24 h-24"><p><img src={fb} alt=''/></p></a>
                <a href='https://www.twitter.com/' className="fill-current w-24 h-24"><p><img src={twitter} alt=''/></p></a>
                <a href='https://www.instagram.com/' className="fill-current w-24 h-24"><p><img src={instagram} alt=''/></p></a>
            </div>
        </nav> 
        <aside>
            <a href='/terms'><div><p>Copyright © 2023 - Todos los derechos reservados by Sushipleto</p></div></a>
        </aside>
    </footer>
    </div>
  )
}