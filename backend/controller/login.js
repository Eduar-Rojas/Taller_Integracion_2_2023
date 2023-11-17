const db = require('../db/db'); // Importa la instancia de cliente de db.js
const bcrypt = require('bcrypt'); // Libreria que se usara para encriptar la contraseña
const jwt = require('jsonwebtoken');


const loginUser = async (email, pass, type) => {

  try {
    // Consulta SQL para obtener el usuario por su correo electrónico
    const query = `
      SELECT * FROM "registro"
      WHERE "email" = $1
    `;

    // Ejecuta la consulta SQL
    const usuario = await db.oneOrNone(query, [email]);

    if (!usuario) {
      console.log('Usuario no encontrado');
      const error = new Error('El correo o contraseña invalidos trate de nuevo.');
      error.statusCode = 400; // Establece el código de estado 400 (Bad Request) en el objeto de error
      throw error;
    }

    // Compara la contraseña ingresada con la contraseña almacenada en la base de datos
    const contrasenaValida = await bcrypt.compare(pass, usuario.password);

    if (!contrasenaValida) {
      console.log('Contraseña incorrecta');
      const error = new Error('El correo o contraseña invalidos trate de nuevo.');
      error.statusCode = 400; // Establece el código de estado 400 (Bad Request) en el objeto de error
      throw error;
    }

    // Usuario autenticado correctamente
    console.log('El usuario ha podido iniciar sesión exitosamente');
    
    const tokenPayload = {
      id_usuario: usuario.id_usuario,
      email: usuario.email,
      admin: usuario.admin,
      type: type
    };
    

    
    const token = jwt.sign(tokenPayload, 'Secreto_XD');

    return { userData: tokenPayload, token };
  } catch (error) {
    console.error('Error al autenticar al usuario:', error);
    throw error;
  }
};


module.exports = { loginUser };