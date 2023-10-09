const express = require('express');
const app = express();
const db = require('./db.js'); // 
const cors = require('cors');
const bcrypt = require('bcrypt'); // Libreria que se usara para encriptar la contraseña
// comando para instalar: npm install bcrypt


app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.post('/registro', async (req, res) => {
  const { nombre, correo, contrasena } = req.body;

  try {

// Genera un salt (En este caso seran 10 rondas de hashing para asegurar la contraseña)
    const saltRounds = 10;

// Se genera el hash de la contraseña, la cual toma como argumentos la contreña y el valor de rondas de hashing

    const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

// Consulta para ver si el correo o el nombre del usuario existen en la base de datos

    const usuarioExistente = await db.oneOrNone('SELECT * FROM registro WHERE correo = $1 OR nombre = $2', [
      correo,
      nombre,
    ]);

// Si el usuario ya existe, enviar un mensaje de error 

    if (usuarioExistente) {
      console.log('El correo o el nombre de usuario que esta colocando en el campo ya están registrados.');
      return res.status(400).send('El correo o el nombre de usuario ya están registrados.');
    }

// Si el usuario no existe se guardaran sus datos en la base de datos
    await db.none('INSERT INTO registro(nombre, correo, contrasena) VALUES ($1, $2, $3)', [
      nombre,
      correo,
      hashedPassword,
    ]);

// Y para finalizar se enviara un mensaje en caso de que el registro haya sido exitoso
    res.status(200).send('¡Formulario exitoso!');
    console.log('registro exitoso');

  } 
    catch (error) {
    console.error('Error al insertar en la base de datos: ', error);
    res.status(500).send('Error al procesar el formulario');
  }
});



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor funcionando en el puerto ${port}`);
});





//  Especifico la consulta SQL
//const sqlQuery = 'SELECT * FROM clientes'

//  Uso la consulta a la base de datos
//db.query(sqlQuery)
  //.then(data => {
  // Maneja los resultados aquí
    //console.log('Resultados de la consulta:', data)
  //})
  //.catch(error => {
  // Maneja los errores aquí
    //console.error('Error al ejecutar la consulta:', error)
  //})