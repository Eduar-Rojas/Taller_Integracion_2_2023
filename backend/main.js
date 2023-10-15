const express = require('express');
const app = express();
const cors = require('cors');
const { registerUser } = require('./controller/register')
const { loginUser } = require('./controller/login');

// comando para instalar: npm install bcrypt
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.post('/registro', async (req, res) => {
  try {
    const { user, email, pass } = req.body;

    // Verifica si los datos requeridos existen en la solicitud
    if (!user || !email || !pass) {
      return res.status(400).send('Faltan datos requeridos.');
    }

    await registerUser(user, email, pass);
    res.status(201).send('Usuario registrado correctamente');
    console.log('Usuario registrado exitosamente');
  } catch (error) {
    console.error('Error al registrar al usuario:', error);

    if (error.statusCode === 400) {
      // Error específico: correo o usuario ya registrados
      res.status(400).send(error.message);
    } else {
      // Otros errores
      res.status(500).send('Error interno del servidor');
    }
  }
});


app.post('/login', async (req, res) => {
  const { email, pass } = req.body;

  try {
    const usuario = await loginUser(email, pass);

    if (usuario) {
      console.log('Su Inicio de sesión ha sido exitoso');
      res.status(200).send('Su Inicio de sesión ha sido exitoso');
    } else {
      console.log('Correo o contraseña incorrectos.');
      res.status(400).send('Correo o contraseña incorrectos.');
    }
  } catch (error) {
    console.error('Error al autenticar al usuario:', error);
    res.status(500).send('Error al procesar la solicitud');
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