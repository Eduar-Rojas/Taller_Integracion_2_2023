import React, { useState } from 'react';
import styled from "styled-components"

import img1 from '../Components/assets/img/1.png'
import img2 from '../Components/assets/img/2.png'


// Se crea arreglo que llevara los datos del producto dentro del carrito.
// useState:  Permite crear y actualizar las variables.
const CarroPro = () => {
  const [ItemCarro, setCarro] = useState([
    { id: 1, imagen: img1, Cantidad: 2, Precio: 2000 },
    { id: 2, imagen: img2, Cantidad: 1, Precio: 2000 },
  ]);


// Se crea una funcion para eliminar (mediante un boton) el pedido, 
// por lo cual se toma la id del arreglo anterior
  const removeFromCart = (id) => {
    const UpdateCarro = ItemCarro.filter((item) => item.id !== id);
    setCarro(UpdateCarro);
  };


// Funcion que permite calcular el monto total del pedido
  const calculateTotal = () => {
    return ItemCarro.reduce((total, item) => total + item.Cantidad * item.Precio, 0);
  };


// Codigo HTML

  return (
    <StyledTable>
      <table className='tabla'>
        <thead className='thead'>
          <tr className='tr'>
            <th>Pedido</th>
            <th>Cantidad de pedidos</th>
            <th>Precio</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {ItemCarro.map((item) => (
            <tr key={item.id}>
              <td style={{ textAlign: 'center' }} ><img src={item.imagen} className='DiseImg' /> </td>
              <td style={{ textAlign: 'center' }} >{item.Cantidad}</td>
              <td style={{ textAlign: 'center' }} >${item.Precio * item.Cantidad}</td>
              <td style={{ textAlign: 'center' }}  >
                <button className='ButtonDelete'  onClick={() => removeFromCart(item.id)}>
                   <span> Eliminar </span>
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ textAlign: 'center' }}  className="total">
        Precio Total: ${calculateTotal()}
        <br /> 
        <button className='buttonEnd'> 
            <span>Realizar Compra</span>
        </button>
      </div>
    </StyledTable>
  );
};

export default CarroPro;

const StyledTable = styled.section`

.tabla{
  width: 100%;
  border-collapse: collapse;

}

.thead{
  font size: 10px;
}

.tr{

  background: rgb(254, 3, 75);
  padding: 10px
  

}

th{
  font-size: 20px;
  border: 4px solid #ddd;
  
}

td{
  text-align: center;
}

.total{
  background: rgb(254, 3, 75); 
  border: 4px solid #ddd; 
    padding: 10px;
}

.ButtonDelete{
  font-size: 18px;
  border: 0;
  border-radius: 20px;
  background: rgb(193, 2, 31); 
  padding: 8px;
}

.ButtonDelete span{
  color: #fff;
}

.ButtonDelete:hover{
  background-color: #111 ;
}

.ButtonDelete:hover span{
  color: rgb(193, 2, 31); 
}


.buttonEnd{
  font-size: 18px;
  border: 0;
  border-radius: 20px;
  background: #fff; 
  padding: 8px;

}

.buttonEnd:hover {
  background: #111; 
}

.buttonEnd:hover span {
  color: #fff; 
}

`;

