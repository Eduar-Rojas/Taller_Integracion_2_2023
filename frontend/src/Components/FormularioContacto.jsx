export function FormularioContacto() {
  return (
    <div className="container">
      <h1 className="text-3xl font-bold">Contactanos que tal</h1>
      <form action="" className="bg-gray800">
        <input type="text" placeholder="Nombre" className=""/>
        <input type="email" placeholder="Correo electronico" />
        <select id="opciones" name="opciones">
          <option value="opcion1">Trabajo</option>
          <option value="opcion2">Reclamo</option>
          <option value="opcion3">Opción 3</option>
        </select>
        <textarea name="" id="" cols="50" rows="10" placeholder="Escriba su mensaje aquí"></textarea>
      </form>
    </div>
  );
}

export default FormularioContacto;
