import React from 'react'

export const Admin = () => {
  
  return (
  <div className='grid grid-cols-3 gap-4'>
      {/* Atrasado */}
      <div className="card w-100 h-96 bg-rojito text-primary-content">
        <div className="card-body">
          <h2 className="text-center text-xl font-bold">Atrasado</h2>
          <div className="overflow-x-auto">
  <table className="table table-xs text-black bg-white">
    <thead>
      <tr className='text-black'>
        <th></th> 
        <th>Nombre</th> 
        <th>Pedido</th> 
        <th>Tiempo de preparación</th>
      </tr>
    </thead> 
    <tbody>
      <tr>
        <th>1</th> 
        <td>Cy Ganderton</td> 
        <td>Quality Control Specialist</td>
        <td><span className="countdown font-mono text-xl">
                  <span style={{"--value":30}}></span>:
                  <span style={{"--value":24}}></span>
                  </span></td> 
        <button className="text-rojito px-3 py-2 rounded font-bold">X</button>
      </tr>
      <tr>
        <th>2</th> 
        <td>Hart Hagerty</td> 
        <td>Desktop Support Technician</td> 
        <td><span className="countdown font-mono text-xl">
                  <span style={{"--value":30}}></span>:
                  <span style={{"--value":24}}></span>
                  </span></td>
        <button className="text-rojito px-3 py-2 rounded font-bold">X</button> 
      </tr>
      <tr>
        <th>3</th> 
        <td>Brice Swyre</td> 
        <td>Tax Accountant</td> 
        <td><span className="countdown font-mono text-xl">
                  <span style={{"--value":30}}></span>:
                  <span style={{"--value":24}}></span>
                  </span></td>
        <button className="text-rojito px-3 py-2 rounded font-bold">X</button>
      </tr>
    </tbody> 
  </table>
</div>
      </div>
    </div>
  {/* Preparando */}
    <div className="card w-100 h-96 bg-rojito text-primary-content">
      <div className="card-body">
        <h2 className="text-center text-xl font-bold">Preparando</h2>
        <table className="table table-xs bg-white text-black">
        <thead>
          <tr className='text-black'>
            <th></th> 
            <th>Nombre</th> 
            <th>Pedido</th> 
            <th>Tiempo de preparación</th>
          </tr>
        </thead> 
        <tbody>
          <tr>
            <th>1</th> 
            <td>Cy Ganderton</td> 
            <td>Quality Control Specialist</td>
            <td><span className="countdown font-mono text-xl">
                  <span style={{"--value":30}}></span>:
                  <span style={{"--value":24}}></span>
                  </span></td>
            <button className="text-rojito px-3 py-2 rounded font-bold">X</button>
          </tr>
          <tr>
            <th>2</th> 
            <td>Hart Hagerty</td> 
            <td>Desktop Support Technician</td> 
            <td><span className="countdown font-mono text-xl">
                  <span style={{"--value":30}}></span>:
                  <span style={{"--value":24}}></span>
                  </span></td> 
            <button className="text-rojito px-3 py-2 rounded font-bold">X</button>
          </tr>
          <tr>
            <th>3</th> 
            <td>Brice Swyre</td> 
            <td>Tax Accountant</td> 
            <td><span className="countdown font-mono text-xl">
                  <span style={{"--value":30}}></span>:
                  <span style={{"--value":24}}></span>
                  </span></td> 
            <button className="text-rojito px-3 py-2 rounded font-bold">X</button>
          </tr>
      </tbody> 
    </table>
      </div>
    </div>
  {/* Finalizado */}
    <div className="card w-100 h-96 bg-rojito text-primary-content">
      <div className="card-body">
        <h2 className="text-center text-xl font-bold">Finalizado</h2>
        <table className="table table-xs text-black bg-white">
          <thead>
            <tr className='text-black'>
              <th></th> 
              <th>Nombre</th> 
              <th>Pedido</th> 
              <th>Tiempo de preparación</th>
            </tr>
          </thead> 
          <tbody>
            <tr>
              <th>1</th> 
              <td>Cy Ganderton</td> 
              <td>Quality Control Specialist</td>
              <td><span className="countdown font-mono text-xl">
                  <span style={{"--value":30}}></span>:
                  <span style={{"--value":24}}></span>
                  </span></td>
              <button className="text-rojito px-3 py-2 rounded font-bold">X</button>
            </tr>
            <tr>
              <th>2</th> 
              <td>Hart Hagerty</td> 
              <td>Desktop Support Technician</td> 
              <td><span className="countdown font-mono text-xl">
                  <span style={{"--value":30}}></span>:
                  <span style={{"--value":24}}></span>
                  </span></td> 
              <button className="text-rojito px-3 py-2 rounded font-bold">X</button>
            </tr>
            <tr>
              <th>3</th> 
              <td>Brice Swyre</td> 
              <td>Tax Accountant</td> 
              <td><span className="countdown font-mono text-xl">
                  <span style={{"--value":30}}></span>:
                  <span style={{"--value":24}}></span>
                  </span></td>
              <button className="text-rojito px-3 py-2 rounded font-bold">X</button>
            </tr>
          </tbody> 
        </table>
      </div>
    </div>
    {/* ------------------------------------------- insumos disponibles ------------------------------------------------------- */}
    <div className="card w-100 h-96 bg-rojito text-primary-content col-span-3">
      <div className="card-body">
        <h2 className="text-center text-xl font-bold">Insumos disponibles</h2>
        <table className="table table-xs text-black bg-white">
          <thead>
            <tr className='text-black'>
              <th></th> 
              <th>Envolturas</th> 
              <th>Vegetales</th> 
              <th>Proteínas</th>
            </tr>
          </thead> 
          <tbody>
            <tr>
              <th>1</th> 
              <td>Cy Ganderton 
                <button className="text-rojito px-3 py-2 rounded font-bold">X</button>
              </td> 
              <td>Quality Control Specialist
                <button className="text-rojito px-3 py-2 rounded font-bold">X</button>
              </td>
              <td>Carroll Group
                <button className="text-rojito px-3 py-2 rounded font-bold">X</button>
              </td>
              <td>Carroll Group
                <button className="text-rojito px-3 py-2 rounded font-bold">X</button>
              </td>
            </tr>
            <tr>
              <th>2</th> 
              <td>Hart Hagerty
                <button className="text-rojito px-3 py-2 rounded font-bold">X</button>
              </td> 
              <td>Desktop Support Technician
                <button className="text-rojito px-3 py-2 rounded font-bold">X</button>
              </td> 
              <td>Carroll Group
                <button className="text-rojito px-3 py-2 rounded font-bold">X</button>
              </td> 
              <td>Carroll Group
                <button className="text-rojito px-3 py-2 rounded font-bold">X</button>
              </td>
            </tr>
            <tr>
              <th>3</th> 
              <td>Brice Swyre
                <button className="text-rojito px-3 py-2 rounded font-bold">X</button>
              </td> 
              <td>Tax Accountant
                <button className="text-rojito px-3 py-2 rounded font-bold">X</button>
              </td> 
              <td>Carroll Group
                <button className="text-rojito px-3 py-2 rounded font-bold">X</button>
              </td>
              <td>Carroll Group
              <button className="text-rojito px-3 py-2 rounded font-bold">X</button>
              </td>
            </tr>
          </tbody> 
        </table>
      </div>
    </div>

  </div>
  )
}

