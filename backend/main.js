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
    const token = jwt.sign({ id_usuario: user }, 'secreto_jwt'); // 'secreto_jwt' es una clave secreta, asegúrate de guardarla de forma segura

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
      const token = jwt.sign({ id_usuario: usuario.id_usuario , email: usuario.email }, 'secreto_jwt'); // 'secreto_jwt' es la misma clave secreta que usaste para firmar el token durante el registro
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


const VerificarToken = (req, res, next) => {
  const token = req.header('Authorization');

  if(!token){
    return res.status(401).json({message:'Accesso denegado'});
  }

  try{
    const zzz = jwt.verify(token , 'secreto_jwt' );
    req.user = zzz;
    next();  
  }catch(error){
    res.status(403).json({message:'Token invalido'});
  }
};



app.get('/datos-usuario', (req,res) => {

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
