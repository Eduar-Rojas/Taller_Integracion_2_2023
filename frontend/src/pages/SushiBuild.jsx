import React, { useState, useEffect } from "react";
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";
import axios from 'axios';

const SushiBuild = () => {
  // Estados
  const [temperature, setTemperature] = useState("");
  const [wrap, setWrap] = useState("");
  const [protein, setProtein] = useState("");
  const [ingredient1, setIngredient1] = useState("");
  const [ingredient2, setIngredient2] = useState("");
  const [selected, setSelected] = useState(null);
  const [selectedProtein, setSelectedProtein] = useState("");

  useEffect(() => {
    // Realiza la solicitud al controlador para obtener los datos de construcción de sushi
    axios.get('/api/SushiBuild')
      .then(response => {
        // Maneja la respuesta exitosa
        const sushiBuildData = response.data;
        console.log('Datos de construcción de sushi:', sushiBuildData);
        // setSushiBuildData(sushiBuildData);
      })
      .catch(error => {
        // Maneja los errores de la solicitud
        console.error('Error al obtener datos de construcción de sushi:', error);
      });
  }, []); // La dependencia vacía asegura que se ejecute solo una vez al montar el componente

  // Métodos
  const handleProteinChange = (event) => {
    setProtein(event.target.value);
  };

  const handleWrapChange = (event) => {
    setWrap(event.target.value);
  };

  const handleClick = (buttonNumber, event) => {
    event.preventDefault();
    setSelected(buttonNumber);
  };

  const handleIngredient1Change = (event) => {
    setIngredient1(event.target.value);
  };

  const handleIngredient2Change = (event) => {
    setIngredient2(event.target.value);
  };


  // Método que guarda el renderizado, este se muestra cuando se selecciona el boton 'Envoltura'
  const renderWrapSelection = () => {
    if (temperature === '1') {
      return (
        <div>
          <h2 className="text-white sm:text-xl md:text-2xl lg:text-2xl">Seleccione envoltura</h2>
          <select className="select select-bordered w-full text-white mb-4" value={wrap} onChange={handleWrapChange}>
            <option value="crema">Queso</option>
            <option value="palta">Palta</option>
            <option value="alga nori">Alga Nori</option>
            <option value="salmon">Sálmon</option>
            <option value="atun">Atún</option>
            <option value="sesamo">Sésamo</option>
          </select>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="font-lato grid grid-cols-2 gap-x-8 bg-black">
      <div className="col-span-2">
        <Header />
      </div>

      <div className="col-span-2 row-start-2 flex justify-center py-4">
        <h1 className="md:text-4xl lg:text-6xl font-bold flex items-start text-white">
          PERSONALIZA TU SUSHI
        </h1>
      </div>

      <div className="row-start-3 place-self-end p-8 border-solid border-2 rounded-r-lg border-rojito shadow-neon">
        <h2 className="sm:text-xl md:text-2xl lg:text-2xl text-white mb-4">
          Seleccione sushi envuelto o frito
        </h2>

        {/*Formulario */}
        <form action="">
          <div className="flex justify-evenly mb-4">
            <button
              className={`btn text-white ${selected === 1 ? "bg-rojito hover:bg-rojito" : "bg-default"
                } w-2/5`}
              onClick={(event) => {
                handleClick(1, event);
                setTemperature("1"); // Cambia el estado de temperature a 1 cuando se selecciona "Envuelto"
              }}
            >
              ENVUELTO
            </button>

            <button
              className={`btn text-white ${selected === 2 ? "bg-rojito hover:bg-rojito" : "bg-default"
                } w-2/5`}
              onClick={(event) => {
                handleClick(2, event);
                setTemperature(0); // Cambia el estado de temperature a 0 cuando se selecciona "Frito"
              }}
            >
              FRITO
            </button>
          </div>

          {renderWrapSelection()}

          <section>
            <h2 className="text-white sm:text-xl md:text-2xl lg:text-2xl">Seleccione proteina</h2>
            <select className="select select-bordered w-full text-white mb-4" value={protein} onChange={handleProteinChange}>
              <option disabled selected>
                Seleccione la proteina
              </option>
              <option value="Kanikama">Kanikama</option>
              <option value="https://res.cloudinary.com/dx1y7g3j0/image/upload/v1698126726/PolloPlancha_cz8efi.jpg">Pollo</option>
              <option value="https://res.cloudinary.com/dx1y7g3j0/image/upload/v1698126726/Salmon_lxcldg.jpg">Salmon</option>
              <option value="https://res.cloudinary.com/dx1y7g3j0/image/upload/v1698126725/Camaron_vrkrew.jpg">Camaron</option>
            </select>
          </section>

          <section>
            <h2 className="text-white sm:text-xl md:text-2xl lg:text-2xl">Seleccione primer relleno</h2>
            <select className="select select-bordered w-full text-white mb-4" value={ingredient1} onChange={handleIngredient1Change}>
              <option disabled selected>
                Seleccione ingrediente
              </option>
              <option value="https://res.cloudinary.com/dx1y7g3j0/image/upload/v1698126726/QuesoCrema_ezidfu.jpg">Queso</option>
              <option value="https://res.cloudinary.com/dx1y7g3j0/image/upload/v1698126725/Choclo_yvfzb8.jpg">Choclo</option>
              <option value="https://res.cloudinary.com/dx1y7g3j0/image/upload/v1698126726/Morron_hyfxpo.jpg">Pimenton</option>
            </select>
          </section>

          <section>
            <h2 className="text-white sm:text-xl md:text-2xl lg:text-2xl">Seleccione segundo relleno</h2>
            <select className="select select-bordered w-full text-white mb-4" value={ingredient2} onChange={handleIngredient2Change}>
              <option disabled selected>
                Seleccione ingrediente
              </option>
              <option value="https://res.cloudinary.com/dx1y7g3j0/image/upload/v1698126726/QuesoCrema_ezidfu.jpg">Queso</option>
              <option value="https://res.cloudinary.com/dx1y7g3j0/image/upload/v1698126725/Choclo_yvfzb8.jpg">Choclo</option>
              <option value="https://res.cloudinary.com/dx1y7g3j0/image/upload/v1698126726/Morron_hyfxpo.jpg">Pimentón</option>
            </select>
          </section>
        </form>
      </div>
      {/*FinDeFormulario */}

      <div className="row-start-3 place-self-start p-8 border-solid border-2 rounded-l-lg border-rojito border-opacity-50">
        <h2>Aqui va el imagen al seleccionar algo + descripción</h2>
        
      </div>

      <div className="col-span-2 mt-24">
        <Footer />
      </div>
    </div>
  );
}

export default SushiBuild;
