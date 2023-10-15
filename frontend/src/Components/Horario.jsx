import horarioimg from './assets/img/horario.png'

export const Horario = () =>{
    return (
        
    <div className="grid grid-cols-2 grid-rows-1 gap-2 bg-black text-white font-thin">
        <div >
            <img src={horarioimg}></img>
        </div>
        <div>
            <h1 className=' text-5xl text-center pt-20'>HORARIOS</h1>
            <p className='text-xl text-center pt-8'>Lunes - Miércoles</p>
            <p className='text-xl text-center font-bold'>13:00 a 22:00</p>
            <p className='text-xl text-center pt-8'>Jueves - Viernes</p>
            <p className='text-xl text-center font-bold'>13:00 a 23:00</p>
            <p className='text-xl text-center pt-8'>Sábados</p>
            <p className='text-xl text-center font-bold'>13:00 a 22:00</p>
            <p className='text-xl text-center italic pt-16 '>*Cerrado Domingos y feriados*</p>
        </div>
    </div>
    
    )
}