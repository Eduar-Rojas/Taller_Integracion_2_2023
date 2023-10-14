const { db } = require('../db/db'); // Importa la instancia de cliente de db.js
const bcrypt = require('bcrypt'); // Libreria que se usara para encriptar la contraseña

const loginUser = async (email, pass) => {
  try {
    // Consulta SQL para obtener el usuario por su correo electrónico
    const query = `
      SELECT * FROM "clientes"
      WHERE "email" = $1
    `;

    // Ejecuta la consulta SQL
    const usuario = await db.oneOrNone(query, [email]);

    if (usuario) {
      // Compara la contraseña ingresada con la contraseña almacenada en la base de datos

      const contrasenaValida = await bcrypt.compare(pass, usuario.password);

      if (contrasenaValida) {
        // Contraseña válida, devuelve el usuario autenticado
        console.log('Usuario autenticado exitosamente');
        return usuario;
      } else {
        // Contraseña incorrecta
        console.log('Contraseña incorrecta');
        return null;
      }
    } else {
      // Usuario no encontrado
      console.log('Usuario no encontrado');
      return null;
    }
  } catch (error) {
    console.error('Error al autenticar al usuario:', error);
    throw error;
  }
};

module.exports = { loginUser };