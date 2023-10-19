import React, { Component } from "react";
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";

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
    };
  }

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
    this.setState({ protein: event.target.value });
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
              <option value="crema">Envuelto en crema</option>
              <option value="palta">Envuelto en palta</option>
              <option value="sesamo">Envuelto en sésamo</option>
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
            Seleccione sushi frito o frío
          </h2>
          <form action="">
            <div className="flex justify-evenly mb-4">
              <button
                className={`btn text-white ${
                  this.state.selected === 1 ? "bg-rojito hover:bg-rojito" : "bg-default"
                } w-2/5`}
                onClick={(event) => this.handleClick(1, event)}
              >
                FRIO
              </button>

              <button
                className={`btn text-white ${
                  this.state.selected === 2 ? "bg-rojito hover:bg-rojito" : "bg-default"
                } w-2/5`}
                onClick={(event) => this.handleClick(2, event)}
              >
                FRITO
              </button>
            </div>

            {this.renderWrapSelection()}

            <section>
              <h2 className="text-white sm:text-xl md:text-2xl lg:text-2xl">Seleccione proteina</h2>
              <select className="select select-bordered w-full text-white mb-4">
                <option disabled selected>
                  Seleccione la proteina
                </option>
                <option>Kanikama</option>
                <option>Pollo</option>
                <option value="">Salmon</option>
                <option value="">Camaron</option>
              </select>
            </section>

            <section>
              <h2 className="text-white sm:text-xl md:text-2xl lg:text-2xl">Seleccione primer relleno</h2>
              <select className="select select-bordered w-full text-white mb-4">
                <option disabled selected>
                  Seleccione ingrediente
                </option>
                <option value="">Queso</option>
                <option value="">Choclo</option>
                <option value="">Pimenton</option>
              </select>
            </section>

            <section>
              <h2 className="text-white sm:text-xl md:text-2xl lg:text-2xl">Seleccione segundo relleno</h2>
              <select className="select select-bordered w-full text-white mb-4">
                <option disabled selected>
                  Seleccione ingrediente
                </option>
                <option value="">Queso</option>
                <option value="">Choclo</option>
                <option value="">Pimentón</option>
              </select>
            </section>
          </form>
        </div>

        <div className="row-start-3 place-self-start p-8 border-solid border-2 rounded-l-lg border-rojito">
          <h2>Aqui va el imagen al seleccionar algo + descripción</h2>
        </div>

        <div className="col-span-2 mt-24">
          <Footer />
        </div>
      </div>
    );
  }
}

export default SushiBuild;
