
const Form_Contact = () => {
  return (
    <div className="md:p-8 ">
      {/*Titulo contactanos*/}
      <h1 className=" text-white text-2xl md:text-4xl lg:text-6xl font-bold mb-4 text-center pb-4">
        Contactanos
      </h1>
      <form
        action=""
        method="post"
        className="max-w-md md:max-w-lg lg:max-w-xl mx-auto"
      >
        {/* Estilo para campos de entrada */}
        <div className="space-y-4 text-white">
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Nombre"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-rojito"
            />
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Correo"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-rojito"
            />
          </div>
          {/* Estilo para el área de texto */}
          <div className="flex flex-col ">
            <textarea
              name=""
              id=""
              placeholder="Mensaje"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-rojito"
              cols="30"
              rows="10"
            ></textarea>
          </div>
        </div>
        {/* Estilo para el botón de enviar */}
        <button
          className=" text-white px-4 py-2 rounded-lg mt-4 hover:bg-rojito focus:outline-none outline outline-offset-2 outline-1 outline-rojito"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </div>
  )
}

export default Form_Contact
