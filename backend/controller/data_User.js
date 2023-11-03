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