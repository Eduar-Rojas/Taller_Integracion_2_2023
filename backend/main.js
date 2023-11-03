const express = require('express');
const app = express();
const cors = require('cors');
const { registerUser } = require('./controller/register')
const { loginUser } = require('./controller/login');
const { getVentasPorDiaQuery } = require('./query/queries_ventas'); 
const auth = require("./middleware/verifyToken");


// comando para instalar: npm install bcrypt
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.post('/register', async (req, res) => {
  try {
    const { user, email, pass } = req.body;

    // Verifica si los datos requeridos existen en la solicitud
    if (!user || !email || !pass) {
      return res.status(400).send('Faltan datos requeridos.');
    }

    const token = await registerUser(user, email, pass); // Captura el token generado
    // constante token que servira para contener la información del usuario identificado
    

    res.status(201).json({ message: 'Usuario registrado correctamente', token });

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
  const { email, pass, type } = req.body;

  try {
    const { userData, token } = await loginUser(email, pass, type);

      console.log('Su Inicio de sesión ha sido exitoso');
      res.status(200).send({ message: 'Su Inicio de sesión ha sido exitoso', token, usuario: userData });

  } catch (error) {

    if (error.statusCode === 400) {
      // Error específico: contraseña incorrecta o usuario no encontrado
      res.status(400).send(error.message);
    } else {
      // Otros errores
      res.status(500).send('Error al procesar la solicitud');
    }
  }
});



app.get('/api/data', auth, (req, res) => {
  // El middleware de verificación del token ya ha ejecutado, por lo que req.user contiene la información del usuario
  if (req.user.admin === true) {
    // Usuario es un administrador, permitir el acceso
    const data = {
      message: 'Hola desde Node.js (Acceso para administradores)',
      // Otros datos que desees enviar
    };
    res.json(data);
  } else {
    // Usuario no es un administrador, devolver un mensaje de acceso denegado
    res.status(403).json({ message: 'Acceso denegado para usuarios no administradores' });
  }
});




app.get('/api/ventas-por-dia', async (req, res) => {
  try {
    const result = await db.many(getVentasPorDiaQuery); // Utiliza la consulta importada

    // Verifica si result contiene datos
    if (result) {
      // Accede directamente a los datos
      console.log(result);
      res.json(result);
    } else {
      console.error('La consulta no retornó datos válidos.');
      res.status(500).json({ error: 'Error al obtener datos de ventas' });
    }
  } catch (error) {
    console.error('Error al obtener datos de ventas:', error);
    res.status(500).json({ error: 'Error al obtener datos de ventas' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor funcionando en el puerto ${port}`);
});
