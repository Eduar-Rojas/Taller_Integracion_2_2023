const express = require('express');
const app = express();
const cors = require('cors');
const { registerUser } = require('./controller/register')
const { loginUser } = require('./controller/login');
const { getVentasPorDiaQuery } = require('./query/queries_ventas'); 
const {VerificarToken} = require("./middleware/verifyToken");

const {DeleteUserProfile}=require('./controller/deleteprofile')
const db = require('./db/db')
const catalogoController = require('./controller/catalogo')
const sushiBuildController = require('./controller/SushiBuild');



// comando para instalar: npm install bcrypt
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api', catalogoController)
app.use('/api', sushiBuildController)



app.post('/register', async (req, res) => {
  try {
    const { user, email, pass,type } = req.body;

    // Verifica si los datos requeridos existen en la solicitud
    if (!user || !email || !pass ) {
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
  
  
    if (!req.user || !req.user.nombre_usuario || !req.user.email) { // se asigna una condicion, la cual es que si no existe "req.user"
    //  (informacion decodificada del usuario) o no existe "id_usuario" o "email", arrojara el error (en este caso '401')
      return res.status(401).json({ message: 'Acceso no autorizado' });
    }
  
  //  se crea el objeto "usuario" el cual tendra las propiedades "id_usuario" y "email" del objeto "req.user"
    const usuario= {
      idregistro:req.user.idregistro,
      nombre_usuario: req.user.nombre_usuario,
      email : req.user.email,
    };
  
    res.status(200).json({usuario});
  });

// ...

app.post('/actualizardatos', VerificarToken, async (req, res) => {
  try {
    const { nombre_usuario, email, id } = req.body;
 
    // Verifica si los datos requeridos existen en la solicitud
    if (!nombre_usuario || !email) {
      return res.status(400).json({ message: 'Faltan datos requeridos.' });
    }
 
    try {
      // Consulta SQL para actualizar el perfil del usuario
      const updateQuery = `
        UPDATE "registro"
        SET "id_usuario" = $1, "email" = $2
        WHERE "id_usuario" = $3
        RETURNING *
      `;
 
      const updatedUserData = await db.oneOrNone(updateQuery, [nombre_usuario, email, id]);
 
      // Devuelve los datos actualizados del usuario
      res.status(200).json({ message: 'Perfil de usuario actualizado correctamente', updatedUserData });
    } catch (error) {
      console.error('Error al actualizar el perfil del usuario:', error.message);
      throw error;
    }
  } catch (error) {
    console.error('Error al actualizar el perfil del usuario:', error);
 
    if (error.message === 'No se pudo actualizar el perfil del usuario.') {
      // Puedes usar el mensaje específico de la excepción
      res.status(400).json({ message: 'No se pudo actualizar el perfil del usuario.' });
    } else if (error.statusCode === 404) {
      // Usuario no encontrado
      res.status(404).json({ message: 'Usuario no encontrado' });
    } else {
      // Otros errores
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
 });
 

app.post('/api/agregar-al-carrito', async (req, res) => {
  try {
    const { id_usuario, id_producto, cantidad } = req.body;

    // Consultar la tabla 'catalogo' para obtener la URL de la imagen del producto
    const productDetailsQuery = `SELECT nombre_producto, descripcion, precio, img FROM catalogo WHERE id_producto = $1`;
    const productDetails = await db.one(productDetailsQuery, [id_producto]);

    // Obtener los detalles del producto, incluida la URL de la imagen
    const { nombre_producto, descripcion, precio, img } = productDetails;

    // Calcular el nuevo precio multiplicando la cantidad por el precio
    const nuevoPrecio = cantidad * precio;

    // Insertar el producto en la tabla 'carrito_compras' con la URL de la imagen obtenida
    const insertQuery = `
      INSERT INTO carrito_compras (id_usuario, id_producto, cantidad, nombrepro, descpro, precio, img)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    await db.none(insertQuery, [
      id_usuario,
      id_producto,
      cantidad,
      nombre_producto,
      descripcion,
      nuevoPrecio,
      img // Utiliza la URL de la imagen obtenida de la tabla 'catalogo'
    ]);

    res.status(200).json({ message: 'Producto agregado al carrito correctamente' });
    console.log('Producto agregado al carrito correctamente');
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    res.status(500).json({ error: 'Error interno del servidor al agregar producto al carrito' });
  }
});



app.get('/api/carrito-compras/:id_usuario', async (req, res) => {
  try {
    const { id_usuario } = req.params;
    // Aquí realiza la consulta SQL para obtener los datos del carrito para el usuario dado
    const carritoData = await db.any('SELECT * FROM carrito_compras WHERE id_usuario = $1', [id_usuario]);

    res.status(200).json(carritoData);
  } catch (error) {
    console.error('Error al obtener datos del carrito:', error);
    res.status(500).json({ error: 'Error al obtener datos del carrito' });
  }
});


// Agrega esta ruta para eliminar un elemento del carrito por su ID
app.delete('/api/carrito-compras/:id_carrito', async (req, res) => {
  try {
    const { id_carrito } = req.params;

    // Realiza la consulta SQL para eliminar el elemento del carrito por su ID
    await db.none('DELETE FROM carrito_compras WHERE id_carrito = $1', [id_carrito]);

    res.status(200).json({ message: 'Elemento eliminado del carrito correctamente' });
  } catch (error) {
    console.error('Error al eliminar elemento del carrito:', error);
    res.status(500).json({ error: 'Error interno del servidor al eliminar elemento del carrito' });
  }
});


// -------------------------------------------------------------------------
app.post('/api/agregar-al-carrito-sushi', async (req, res) => {
  try {
    const { id_usuario, wrap, protein, ingredient1, ingredient2 , img, cantidad} = req.body;

    // Unir los valores de wrap, protein, ingredient1 e ingredient2 en la columna 'descpro'
    const descpro = `${wrap}, ${protein}, ${ingredient1}, ${ingredient2}`;
  

    // Insertar en la tabla 'carrito_compras' con los datos recibidos y valores predeterminados
    const insertQuery = `
    INSERT INTO "carrito_pedidos" (id_usuario , nombrepro, descpedidos, precio, img, cantidad)
    VALUES ($1, $2, $3, $4, $5, $6)
  `;
  

    await db.none(insertQuery, [
      id_usuario,
      'SushiPersonalizado', // Valor predeterminado para el nombrepro
      descpro, // La columna 'descpro' con los valores unidos
      9900,
      'zzz',
      1,
       // Valor predeterminado para el precio
    ]);

    res.status(200).json({ message: 'Pedido de sushi agregado al carrito correctamente' });
    console.log('Pedido de sushi agregado al carrito correctamente');
  } catch (error) {
    console.error('Error al agregar pedido de sushi al carrito:', error);
    res.status(500).json({ error: 'Error interno del servidor al agregar pedido de sushi al carrito' });
  }
});


app.get('/api/agregar-al-carrito-sushi/:id_usuario', async (req, res) => {
  try {
    const { id_usuario } = req.params;
    // Aquí realiza la consulta SQL para obtener los datos del carrito para el usuario dado
    const carritoData = await db.any('SELECT * FROM carrito_pedidos WHERE id_usuario = $1', [id_usuario]);

    res.status(200).json(carritoData);
  } catch (error) {
    console.error('Error al obtener datos del carrito:', error);
    res.status(500).json({ error: 'Error al obtener datos del carrito' });
  }
});


app.delete('/api/agregar-al-carrito-sushi/:id_pedido', async (req, res) => {
  try {
    const { id_pedido } = req.params;

    // Realiza la consulta SQL para eliminar el elemento del carrito por su ID
    await db.none('DELETE FROM carrito_pedidos WHERE id_pedido = $1', [id_pedido]);

    res.status(200).json({ message: 'Elemento eliminado del carrito correctamente' });
  } catch (error) {
    console.error('XDDDD')
    console.error('Error al eliminar elemento del carrito:', error);
    res.status(500).json({ error: 'Error interno del servidor al eliminar elemento del carrito' });
  }
});

// --------------------------------------------------------------------------------------



app.get('/api/mandar-carrito-compras/:id_carrito',async(req,res)=>{
  try {
    const { id_carrito } = req.params;
 
    // Perform the SQL query to get the element from the cart by its ID
    const result = await db.oneOrNone('SELECT id_producto,nombrepro,precio FROM carrito_compras WHERE id_carrito = $1', [id_carrito]);
 
    res.status(200).json(result);
  } catch (error) {
    console.error('Error ak mostrar:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
 });




  //eliminar cuenta
app.post('/eliminacioncuenta', VerificarToken, async (req, res) => {
  try {
    const { nombre_usuario,email } = req.body;
    if (!nombre_usuario) {
      return res.status(400).send('Faltan datos requeridos para la eliminación de la cuenta.');
    }

   
    await DeleteUserProfile(nombre_usuario,email);

    res.status(200).json({ message: 'Cuenta de usuario eliminada correctamente' });

  } catch (error) {
    console.error('Error al eliminar la cuenta de usuario:', error);

    if (error.message === 'No se pudo eliminar el perfil del usuario.') {
      return res.status(400).json({ error: 'No se pudo eliminar el perfil del usuario.' });
    }

    res.status(500).json({ error: 'Error interno del servidor al eliminar la cuenta de usuario' });
  }
});




const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor funcionando en el puerto ${port}`);
});




