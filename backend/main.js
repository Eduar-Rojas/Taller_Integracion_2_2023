const express = require('express');
const app = express();
const cors = require('cors');
const { registerUser } = require('./controller/register')
const { loginUser } = require('./controller/login');
const jwt = require('jsonwebtoken');


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
    // constante token que servira para contener la información del usuario identificado
    const token = jwt.sign({ id_usuario: user }, 'Secreto_XD'); // 'Secreto_XD' es una clave secreta, asegúrate de guardarla de forma segura

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
  const { email, pass } = req.body;

  try {
    const usuario = await loginUser(email, pass);

    if (usuario) {
    // constante token que servira para contener la información del usuario identificado
      const token = jwt.sign({ id_usuario: usuario.id_usuario , email: usuario.email }, 'Secreto_XD'); // 'Secreto_XD' es la misma clave secreta que usaste para firmar el token durante el registro
      console.log('Su Inicio de sesión ha sido exitoso');
      res.status(200).send({message: 'Su Inicio de sesión ha sido exitoso', token, usuario: {id_usuario: usuario.id_usuario , email: usuario.email} });


    } else {
      console.log('Correo o contraseña incorrectos.');
      res.status(400).send('Correo o contraseña incorrectos.');
    }


  } catch (error) {
    console.error('Error al autenticar al usuario:', error);
    res.status(500).send('Error al procesar la solicitud');
  }
});


const VerificarToken = (req, res, next) => {   // 
  const tokenHeader = req.header('Authorization');  // se obtiene el token del encabezado 'Authorization'

  if(!tokenHeader){      // si no se encuentra el token devuelve el siguiente error 
    return res.status(401).json({message:'Accesso denegado'});
  }

  try{

    const token = tokenHeader.replace('Bearer ', ''); // se extrae el token de 'Authorization' pero se elimina el prefijo 'Bearer' 

    const decodedToken = jwt.verify(token, 'Secreto_XD'); // se ultiliza la bliblioteca "jsonwebtoken" para verificar el token 
     // con la clave secreta "Secreto_XD", si es valido, este puede ser decodificado

    req.user = decodedToken; // la informacion del usuario decodificada se agrega al objeto ("req.user") para que este disponible 
    // para las rutas
    next();  // en caso de que el token no sea valido, se llama a next() para manejar la solicitud como no autorizada
  }catch(error){
    res.status(403).json({message:'Token invalido'});
  }
};



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

// })

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor funcionando en el puerto ${port}`);
});
