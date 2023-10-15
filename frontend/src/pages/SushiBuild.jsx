import { useState } from "react";
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";

const SushiBuild = () => {
  const [temperature, setTemperature] = useState("");
  const [wrap, setWrap] = useState("");
  const [protein, setProtein] = useState("");
  const [ingredient1, setIngredient1] = useState("");
  const [ingredient2, setIngredient2] = useState("");

  const handleTemperatureChange = (event) => {
    setTemperature(event.target.value);
  };

  const handleWrapChange = (event) => {
    setWrap(event.target.value);
  };

  const [selected, setSelected] = useState(null);

  const handleClick = (buttonNumber) => {
    event.preventDefault();
    setSelected(buttonNumber);
  };

  const handleProteinChange = (event) => {
    setProtein(event.target.value);
  };

  const handleIngredient1Change = (event) => {
    setIngredient1(event.target.value);
  };

  const handleIngredient2Change = (event) => {
    setIngredient2(event.target.value);
  };

  const renderWrapSelection = () => {
    if (temperature === 1) {
      return (
        <div>
          <label>
            Selecciona la envoltura:
            <select value={wrap} onChange={handleWrapChange}>
              <option value="crema">Envuelto en crema</option>
              <option value="palta">Envuelto en palta</option>
              <option value="sesamo">Envuelto en sesamo</option>
              {/*Debo agregar mas opciones  */}
            </select>
            <img src={`${wrap}`} alt={`${wrap}`} />
          </label>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {/*Header y titulo de la pag */}
      <div className="col-span-2">
        <Header />
      </div>

      <div className="col-span-2 row-start-2 flex justify-center py-4">
        <h1 className="md:text-4xl lg:text-6xl font-bold flex items-start text-white">
          PERSONALIZA TU SUSHI
        </h1>
      </div>

      {/*Formulario build sushi */}
      <div className="row-start-3 pl-20 border-solid border-2 border-rojito p-">
        <h2 className="md:text-2xl lg:text-4xl pb-4 text-white">
          ¿Frío o frito?
        </h2>
        <form action="">
          <div className="space-x-4">
            <button
              className={`btn text-white ${
                selected === 1 ? "bg-rojito hover:bg-rojito" : "bg-default"
              } w-2/5`}
              onClick={() => handleClick(1)}
            >
              FRIO
            </button>

            <button
              className={`btn text-white ${
                selected === 2 ? "bg-rojito hover:bg-rojito" : "bg-default"
              } w-2/5`}
              onClick={() => handleClick(2)}
            >
              FRITO
            </button>
          </div>

          {renderWrapSelection}

          <section>
            <h2 className="py-4 text-white">Seleccione proteina</h2>
            <select className="select select-bordered w-full max-w-xs text-white">
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
            <h2 className="text-white">Seleccione primer relleno</h2>
            <select className="select select-bordered w-full max-w-xs text-white">
              <option disabled selected>
                Seleccione ingrediente
              </option>
              <option value="">Queso</option>
              <option value="">Choclo</option>
              <option value="">Pimenton</option>
            </select>
          </section>

          <section>
            <h2 className="text-white">Seleccione segundo relleno</h2>
            <select className="select select-bordered w-full max-w-xs text-white">
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

      <div className="row-start-3">
        <h2>Aqui va el imagen al selecionar algo + descripcion</h2>
      </div>

      <div className="col-span-2">
        <Footer />
      </div>
    </div>
  );
};

export default SushiBuild;
