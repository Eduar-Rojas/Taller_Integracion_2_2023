import React, { useState, useEffect } from "react";
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";
import axios from 'axios';

const SushiBuild = () => {
  const [temperature, setTemperature] = useState("");
  const [wrap, setWrap] = useState("");
  const [protein, setProtein] = useState("");
  const [ingredient1, setIngredient1] = useState("");
  const [ingredient2, setIngredient2] = useState("");

  const [selected, setSelected] = useState(null);
  const [summary, setSummary] = useState([]);

  const [proteinIngredients, setProteinIngredients] = useState([]);
  const [fillingIngredients, setFillingIngredients] = useState([]);
  const [secondFillingIngredients, setSecondFillingIngredients] = useState([]);
  const [wrapIngredients, setWrapIngredients] = useState([]);

  useEffect(() => {
    const fetchIngredients = async (categoria, setIngredientsFunction) => {
      try {
        const response = await axios.get('http://localhost:3000/api/ingredientes', { params: { categoria } });
        const ingredientsData = response.data;
        console.log(`Datos de ${categoria}:`, ingredientsData);

        // Filtra los ingredientes que contienen la categoría seleccionada
        const filteredIngredients = ingredientsData.filter(ingredient => (
          ingredient.categoria.includes(categoria)
        ));

        setIngredientsFunction(filteredIngredients);
      } catch (error) {
        console.error(`Error al obtener ingredientes de ${categoria}:`, error);
      }
    };

    fetchIngredients('Proteina', setProteinIngredients);
    fetchIngredients('Relleno', setFillingIngredients);
    fetchIngredients('Relleno', setSecondFillingIngredients);
    fetchIngredients('Envoltura', setWrapIngredients);
  }, []);

  // Métodos
  const updateSummary = (category, value) => {
    // Verifica si ya hay una entrada para la categoría en el resumen
    const existingIndex = summary.findIndex(item => item.category === category);

    if (existingIndex !== -1) {
      // Si la entrada para la categoría ya existe, actualiza el valor
      const updatedSummary = [...summary];
      updatedSummary[existingIndex] = { category, value };
      setSummary(updatedSummary);
    } else {
      // Si la categoría no existe, agrega una nueva entrada
      const updatedSummary = [...summary, { category, value }];
      setSummary(updatedSummary);
    }
  };

  const handleProteinChange = (event) => {
    setProtein(event.target.value);
    updateSummary("Proteína", event.target.value);
  };

  const handleWrapChange = (event) => {
    setWrap(event.target.value);
    updateSummary("Envoltura", event.target.value);
  };

  const handleIngredient1Change = (event) => {
    setIngredient1(event.target.value);
    updateSummary("Primer Relleno", event.target.value);
  };

  const handleIngredient2Change = (event) => {
    setIngredient2(event.target.value);
    updateSummary("Segundo Relleno", event.target.value);
  };

  const handleClick = (buttonNumber, event) => {
    event.preventDefault();
    if (buttonNumber === 2) {
      setWrap("");
    }
    
    setSelected(buttonNumber);
  };

  const renderSummary = () => {
    const summaryData = [];

    // Agrega los elementos al resumen solo si están seleccionados
    if (temperature === "1") {
      summaryData.push({ category: "Envoltura", value: wrap });
    }

    // Agrega los elementos al resumen solo si están seleccionados
    if (protein) {
      summaryData.push({ category: "Proteina", value: protein });
    }

    // Agrega los elementos al resumen solo si están seleccionados
    if (ingredient1) {
      summaryData.push({ category: "Primer Relleno", value: ingredient1 });
    }

    // Agrega los elementos al resumen solo si están seleccionados
    if (ingredient2) {
      summaryData.push({ category: "Segundo Relleno", value: ingredient2 });
    }

    return summaryData;
  };

  // Método que valida la disponibilidad de los ingredientes seleccionados
  const validateAvailability = () => {
    const unavailableIngredients = [];

    // Verifica la disponibilidad de la envoltura si está seleccionada
    if (temperature === '1' && wrap) {
      const selectedWrap = wrapIngredients.find(ingredient => ingredient.nombre === wrap);
      if (!selectedWrap || !selectedWrap.disponibilidad) {
        unavailableIngredients.push('Envoltura');
      }
    }

    // Verifica la disponibilidad de la proteína si está seleccionada
    if (protein) {
      const selectedProtein = proteinIngredients.find(ingredient => ingredient.nombre === protein);
      if (!selectedProtein || !selectedProtein.disponibilidad) {
        unavailableIngredients.push('Proteina');
      }
    }

    // Verifica la disponibilidad del primer relleno si está seleccionado
    if (ingredient1) {
      const selectedIngredient1 = fillingIngredients.find(ingredient => ingredient.nombre === ingredient1);
      if (!selectedIngredient1 || !selectedIngredient1.disponibilidad) {
        unavailableIngredients.push('Primer Relleno');
      }
    }

    // Verifica la disponibilidad del segundo relleno si está seleccionado
    if (ingredient2) {
      const selectedIngredient2 = fillingIngredients.find(ingredient => ingredient.nombre === ingredient2);
      if (!selectedIngredient2 || !selectedIngredient2.disponibilidad) {
        unavailableIngredients.push('Segundo Relleno');
      }
    }

    // Muestra un mensaje si hay ingredientes no disponibles
    if (unavailableIngredients.length > 0) {
      alert(`El ingrediente escogido en '${unavailableIngredients.join(', ')}', no está disponible`);
    } else {
      alert('¡Ingredientes disponibles!');
      // Aquí puedes agregar lógica adicional si todos los ingredientes están disponibles
    }
  };


  // Método que guarda el renderizado, este se muestra cuando se selecciona el boton 'Envoltura'
  const renderWrapSelection = () => {
    if (temperature === '1') {
      return (
        <section>
          <h2 className="text-white sm:text-xl md:text-2xl lg:text-2xl">Seleccione envoltura</h2>
          <select className="select select-bordered w-full text-white mb-4" value={wrap} onChange={handleWrapChange}>
            <option disabled selected>
              Seleccione la envoltura
            </option>
            {wrapIngredients.map(ingredient => (
              <option key={ingredient.id} value={ingredient.nombre}>{ingredient.nombre}</option>
            ))}
          </select>
        </section>
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

          {/* Selección de proteína */}
          <section>
            <h2 className="text-white sm:text-xl md:text-2xl lg:text-2xl">Seleccione proteina</h2>
            <select className="select select-bordered w-full text-white mb-4" value={protein} onChange={handleProteinChange}>
              <option disabled selected>
                Seleccione la proteina
              </option>
              {proteinIngredients.map(ingredient => (
                <option key={ingredient.id} value={ingredient.nombre}>{ingredient.nombre}</option>
              ))}
            </select>
          </section>

          {/* Selección de primer relleno */}
          <section>
            <h2 className="text-white sm:text-xl md:text-2xl lg:text-2xl">Seleccione primer relleno</h2>
            <select className="select select-bordered w-full text-white mb-4" value={ingredient1} onChange={handleIngredient1Change}>
              <option disabled selected>
                Seleccione ingrediente
              </option>
              {fillingIngredients.map(ingredient => (
                <option key={ingredient.id} value={ingredient.nombre}>{ingredient.nombre}</option>
              ))}
            </select>
          </section>
          
          {/* Selección de segundo relleno */}
          <section>
            <h2 className="text-white sm:text-xl md:text-2xl lg:text-2xl">Seleccione segundo relleno</h2>
            <select className="select select-bordered w-full text-white mb-4" value={ingredient2} onChange={handleIngredient2Change}>
              <option disabled selected>
                Seleccione ingrediente
              </option>
              {secondFillingIngredients.map(ingredient => (
                <option key={ingredient.id} value={ingredient.nombre}>{ingredient.nombre}</option>
              ))}
            </select>
          </section>
        </form>
      </div>
      {/*FinDeFormulario */}

      <div className="row-start-3 place-self-start p-8 border-solid border-2 rounded-l-lg border-rojito border-opacity-50">
      <h2 className="sm:text-xl md:text-2xl lg:text-2xl text-white mb-4">Resumen de tu rollo sushi: </h2>
        <ul>
          {renderSummary().map((item, index) => (
            <li key={index}>
              <strong>{item.category}:</strong> {item.value}
            </li>
          ))}
        </ul>

        {/*Boton que comprueba si los datos están disponibles. */}
        <div>
          <button className="btn btn-xs sm:btn-sm md:btn-md" onClick={validateAvailability}>Agregar</button>
        </div>
      </div>

      <div className="col-span-2 mt-24">
        <Footer />
      </div>
    </div>
  );
}

export default SushiBuild;
