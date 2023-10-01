import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Requiere importar los estilos
import foto1 from '../Components/assets/img/carrusel1.png'
import foto2 from '../Components/assets/img/carrusel2.png'


export const Promociones = () => {
  const images = [foto1, foto2];

  return (
    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} />
        </div>
      ))}
    </Carousel>
  );
}
