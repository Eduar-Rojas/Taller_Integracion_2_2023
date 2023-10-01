import React from 'react'
import './Assets/css/Footer.css'
import fb from './Assets/img/facebook.png'
import twitter from './Assets/img/twitter.png'
import instagram from './Assets/img/instagram.png'

export const Footer = () => {
  return (
    <div className="footer">
        <div className="ct_footer section-padding">
            <div className="ct_footer-links">
                <div className="ct_footer-links_div">
                    <h4>Sobre nosotros</h4> 
                </div>
                <div className="ct_footer-links_div">
                    <h4>Recursos</h4>
                </div>
                <div className="ct_footer-links_div">
                    <h4>Ayuda</h4>
                </div>
                <div className="ct_footer-links_div">
                    <h4>Contáctanos</h4>
                </div>
                <div className="ct_footer-links_div">
                    <h4>Nuestras redes sociales</h4>
                    <div className="socialmedia">
                        <p><img src={fb} alt=''/></p>
                        <p><img src={twitter} alt=''/></p>
                        <p><img src={instagram} alt=''/></p>
                    </div>
                </div>
            </div>

            <hr></hr>

            <div className="ct_footer-below">
                <div className="ct_footer-copyright">
                    <p>
                        @{new Date().getFullYear()} Sushipleto. Todos los derechos reservados.
                    </p>
                </div>
                <div className="ct_footer-below-links">
                    <a href='/terms'><div><p>Términos y condiciones.</p></div></a>
                </div>
            </div>
        </div>
    </div>
  )
}