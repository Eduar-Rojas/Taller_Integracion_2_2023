import React, { Component } from "react";
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";
import cloudinary from 'cloudinary-core';



class SushiBuild extends Component {
  constructor(props) {
    super(props);

    this.state = {
      temperature: "",
      wrap: "",
      protein: "",
      ingredient1: "",
      ingredient2: "",
      selected: null,
      showtext: "",
      showtext:"",
      selectedProtein:"",
   
    };
  }


  handleProteinChange = (event) => {
    this.setState({ protein: event.target.value });
  };


  handleTemperatureChange = (event) => {
    this.setState({ temperature: event.target.value });
  };

  handleWrapChange = (event) => {
    this.setState({ wrap: event.target.value });
  };

  handleClick = (buttonNumber, event) => {
    event.preventDefault();
    this.setState({ selected: buttonNumber });
  };

  handleProteinChange = (event) => {
    const selectedProtein = event.target.value;
    this.setState({ selectedProtein});

    // Realiza una solicitud GET al servidor para obtener la descripción
    fetch(`/datos/${selectedProtein}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ showtext: data.showtext });
      })
      .catch((error) => {
        console.error('Error al obtener la descripción:', error);
      });
  };
  

  handleIngredient1Change = (event) => {
    this.setState({ ingredient1: event.target.value });
  };

  handleIngredient2Change = (event) => {
    this.setState({ ingredient2: event.target.value });
  };

  renderWrapSelection = () => {
    if (this.state.temperature === 1) {
      return (
        <div>
          <label>
            Selecciona la envoltura:
            <select value={this.state.wrap} onChange={this.handleWrapChange}>
              <option value="crema">Queso</option>
              <option value="palta">Palta</option>
              <option value="sesamo">Alga Nori</option>
              <option value="sesamo">Sálmon</option>
              <option value="sesamo">Atún</option>
              <option value="sesamo">Sésamo</option>
              {/*Debes agregar más opciones */}
            </select>
            <img src={`${this.state.wrap}`} alt={`${this.state.wrap}`} />
          </label>
        </div>
      );
    }
    return null;
  };

  render() {
    return (
      <div className="font-lato grid grid-cols-2 gap-x-8 bg-black">{/* Grid padre */}
        <div className="col-span-2">
          <Header />
        </div>

        <div className="col-span-2 row-start-2 flex justify-center py-4"> {/* Grid hijo */}
          <h1 className="md:text-4xl lg:text-6xl font-bold flex items-start text-white">
            PERSONALIZA TU SUSHI
          </h1>
        </div>

        <div className="row-start-3 place-self-end p-8 border-solid border-2 rounded-r-lg border-rojito shadow-neon"> {/* Grid hijo */}
          <h2 className="sm:text-xl md:text-2xl lg:text-2xl text-white mb-4">
            Seleccione sushi frito o frío
          </h2>
          <form action="">
            <div className="flex justify-evenly mb-4">
              <button
                className={`btn text-white ${this.state.selected === 1 ? "bg-rojito hover:bg-rojito" : "bg-default"
                  } w-2/5`}
                onClick={(event) => this.handleClick(1, event)}
              >
                FRIO
              </button>

              <button
                className={`btn text-white ${this.state.selected === 2 ? "bg-rojito hover:bg-rojito" : "bg-default"
                  } w-2/5`}
                onClick={(event) => this.handleClick(2, event)}
              >
                FRITO
              </button>
            </div>

            {this.renderWrapSelection()}

            <section>
              <h2 className="text-white sm:text-xl md:text-2xl lg:text-2xl">Seleccione proteina</h2>
              <select className="select select-bordered w-full text-white mb-4" value={this.state.protein} onChange={this.handleProteinChange}>
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
              <select className="select select-bordered w-full text-white mb-4" value={this.state.ingredient1} onChange={this.handleIngredient1Change}>
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
              <select className="select select-bordered w-full text-white mb-4" value={this.state.ingredient2} onChange={this.handleIngredient2Change}>
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

        <div className="row-start-3 place-self-start p-8 border-solid border-2 rounded-l-lg border-rojito border-opacity-50"> {/* Grid hijo */}
          <h2>Aqui va el imagen al seleccionar algo + descripción</h2>

    {/* Mostrar la descripción de la proteína seleccionada */}
    {this.state.selectedProtein && (
  <div className="text-white">
    <h2>Descripción de la proteína:</h2>
    <p>{this.state.showtext}</p>
  </div>
)}





          <div> {this.state.protein && (
            <img 
              src={this.state.protein} 
              className="object-cover h-64 w-64" />
              )}
          </div>

          <div> {this.state.ingredient1 && (
            <img 
              src={this.state.ingredient1} 
              className="object-cover h-64 w-64" />
              )}
          </div>

          <div> {this.state.ingredient2 && (
            <img 
              src={this.state.ingredient2} 
              className="object-cover h-64 w-64" />
              )}
          </div>
<div> {this.state.protein && (
          <img src={this.state.protein} alt="Seleccion de proteina"
          style={{ width: '200px', height: '150px',objectFit: 'fill' }} />

        )} 
        
        {this.state.showtext && <p>Descripción: {this.state.showtext}</p>}
        
         </div>

        </div>

        <div className="col-span-2 mt-24">
          <Footer />
        </div>
      </div>
    );
  }
}

export default SushiBuild;
