export function ContactUsForm() {
  return (
    <div className="p-4 md:p-8 lg:p-16">
      {/*Titulo contactanos*/}
      <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-4 text-center">
        Contactanos
      </h1>
      <form
        action=""
        method="post"
        className="max-w-md md:max-w-lg lg:max-w-xl mx-auto"
      >
        {/* Estilo para campos de entrada */}
        <div className="space-y-4">
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Nombre"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Correo"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          {/* Estilo para el área de texto */}
          <div className="flex flex-col">
            <textarea
              name=""
              id=""
              placeholder="Mensaje"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              cols="30"
              rows="10"
            ></textarea>
          </div>
        </div>
        {/* Estilo para el botón de enviar */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

export default ContactUsForm;
