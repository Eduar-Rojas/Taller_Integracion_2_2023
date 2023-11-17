const  db  = require('../db/db'); // Importa la instancia de cliente de db.js
const bcrypt = require('bcrypt'); // Libreria que se usara para encriptar la contraseña
const jwt = require('jsonwebtoken');

const registerUser = async (user, email, pass,type) => {
  try {
    // Consulta para ver si el correo o el nombre del usuario existen en la base de datos
    const usuarioExistente = await db.oneOrNone('SELECT * FROM registro WHERE email = $1 OR id_usuario = $2', [
      email,
      user,
    ]);

    // Si el usuario ya existe, enviar un mensaje de error 

    if (usuarioExistente) {
      const error = new Error('El correo o el nombre de usuario ya están registrados.');
      error.statusCode = 400; // Establece el código de estado 400 (Bad Request) en el objeto de error
      throw error;
    }

    // Genera un salt (En este caso seran 10 rondas de hashing para asegurar la contraseña)
    const saltRounds = 10;

    // Se genera el hash de la contraseña, la cual toma como argumentos la contreña y el valor de rondas de hashing
    const hashedPassword = await bcrypt.hash(pass, saltRounds);

    // Valor para la columna administrador
    const admin = false;
    const role = 'user';  // Se puede asignar 'admin' si es un administrador
    // Parámetros de la consulta

    const token = jwt.sign({ id_usuario: user, admin: admin }, 'Secreto_XD'); // 'Secreto_XD' es una clave secreta, asegúrate de guardarla de forma segura

    const values = [user, email, hashedPassword, token, admin, role ,type];

    const query = `
    INSERT INTO "registro" ("id_usuario", "email", "password", "token",  "admin", "role")
    VALUES ($1, $2, $3, $4, $5, $6)
  `;

    // Ejecuta la consulta SQL con los valores proporcionados
    await db.none(query, values);



    return token
  } catch (error) {
    throw error;
  }


};

module.exports = { registerUser };