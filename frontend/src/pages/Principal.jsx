import '../App'
import {Header} from '../Components/Header'
import {Footer} from '../Components/Footer'
import {Mensaje} from '../Components/Mensaje'
import {Promociones} from '../Components/Promociones'
import {MasVendido} from '../Components/MasVendido'
import {Horario} from '../Components/Horario'

export const Principal = () => {

  return (
 
<div className="grid grid-cols-5 grid-rows-8 gap-3 overflow-hidden bg-[#161a1d]">
    <div className="col-span-5"><Header/></div>
    <div className="col-span-5 row-start-2"><Mensaje/></div>
    <div className="col-span-5 row-span-2 row-start-3"><Promociones/></div>
    <div className="col-span-5 row-span-2 row-start-5"><MasVendido/></div>
    <div className='col-span-5 row-span-2 row start-3'><Horario/></div>
    <div className="col-span-5 row-start-8"><Footer/></div>
</div>
    
  )
}

export default Principal
