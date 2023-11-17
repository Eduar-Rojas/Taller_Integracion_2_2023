const express = require('express');
const app = express();
const cors = require('cors');
const { registerUser } = require('./controller/register')
const { loginUser } = require('./controller/login');
const { getVentasPorDiaQuery } = require('./query/queries_ventas'); 
const {VerificarToken} = require("./middleware/verifyToken");
const { updateUserProfile}=require('./controller/updateprofile')
const db = require('./db/db')

// comando para instalar: npm install bcrypt
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.post('/register', async (req, res) => {
  try {
    const { user, email, pass,type } = req.body;

    // Verifica si los datos requeridos existen en la solicitud
    if (!user || !email || !pass || !type) {
      return res.status(400).send('Faltan datos requeridos.');
    }

    const token = await registerUser(user, email, pass,type); // Captura el token generado
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



app.get('/api/data', VerificarToken, (req, res) => {
  // El middleware de verificación del token ya ha ejecutado, por lo que req.user contiene la información del usuario
  if (req.user.role === 'admin') {
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



app.get('/datos-usuario', VerificarToken,  (req,res) => {  // primero que todo se define la ruta "get" para solicitar los datos
  // lo cual antes se ejecutara primero la funcion "VerificarToken" antes de que llegue a la funcion de manejo de la ruta
  
  
    if (!req.user || !req.user.id_usuario || !req.user.email) { // se asigna una condicion, la cual es que si no existe "req.user"
    //  (informacion decodificada del usuario) o no existe "id_usuario" o "email", arrojara el error (en este caso '401')
      return res.status(401).json({ message: 'Acceso no autorizado' });
    }
  
  //  se crea el objeto "usuario" el cual tendra las propiedades "id_usuario" y "email" del objeto "req.user"
    const usuario= {
      id_usuario: req.user.id_usuario,
      email : req.user.email,
    };
  
    res.status(200).json({usuario});
  });


  app.post('/actualizar-datos', VerificarToken, async (req, res) => {
    try {
      if (!req.user || !req.user.id_usuario || !req.user.email) {
        return res.status(401).json({ message: 'Acceso no autorizado' });
      }
  
      const { id_usuario, email } = req.body;
  
     
      if (!id_usuario || !email) {
        return res.status(400).json({ message: 'Faltan datos requeridos.' });
      }
  
  
      const token = await updateUserProfile(id_usuario, email);
  
      res.status(201).json({ message: 'Perfil de usuario actualizado correctamente', token });
  
      console.log('Perfil de usuario actualizado exitosamente');
    } catch (error) {
      console.error('Error al actualizar el perfil de usuario:', error);
  
      if (error.statusCode === 400) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error interno del servidor' });
      }
    }
  });
  
  


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor funcionando en el puerto ${port}`);
});