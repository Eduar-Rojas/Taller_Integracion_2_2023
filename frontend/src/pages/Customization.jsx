// SushiRoll.js
import React, { useState } from 'react';

const SushiRoll = () => {
  const [temperature, setTemperature] = useState('');
  const [wrap, setWrap] = useState('');
  const [protein, setProtein] = useState('');
  const [ingredient1, setIngredient1] = useState('');
  const [ingredient2, setIngredient2] = useState('');

  const handleTemperatureChange = (event) => {
    setTemperature(event.target.value);
  };

  const handleWrapChange = (event) => {
    setWrap(event.target.value);
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

  return (
    <div>
      <h1>Personaliza tu rollo de sushi</h1>

      <div>
        <label>
          ¿Quieres tu pieza frita o fría?
          <select value={temperature} onChange={handleTemperatureChange}>
            <option value="frita">Frita</option>
            <option value="fría">Fría</option>
          </select>
        </label>
      </div>

      {temperature === 'fría' && (
        <div>
          <label>
            Selecciona la envoltura:
            <select value={wrap} onChange={handleWrapChange}>
              <option value="crema">Envuelto en crema</option>
              <option value="palta">Envuelto en palta</option>
              <option value="sesamo">Envuelto en sésamo</option>
              {/* Agrega más opciones según sea necesario */}
            </select>
            <img src={`url_de_imagen_${wrap}.jpg`} alt={`${wrap} roll`} />
          </label>
        </div>
      )}

      <div>
        <label>
          Selecciona la proteína:
          <select value={protein} onChange={handleProteinChange}>
            <option value="salmón">Salmón</option>
            <option value="atún">Atún</option>
            {/* Agrega más opciones según sea necesario */}
          </select>
          <img src={`url_de_imagen_${protein}.jpg`} alt={`${protein} roll`} />
        </label>
      </div>

      <div>
        <label>
          Ingrediente 1:
          <input type="text" value={ingredient1} onChange={handleIngredient1Change} />
        </label>
      </div>

      <div>
        <label>
          Ingrediente 2:
          <input type="text" value={ingredient2} onChange={handleIngredient2Change} />
        </label>
      </div>
    </div>
  );
};

export default SushiRoll;