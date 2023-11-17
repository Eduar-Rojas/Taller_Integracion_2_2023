const jwt = require("jsonwebtoken");

const VerificarToken = (req, res, next) => {   // 

    const token = req.body.token || req.query.token || req.params.token || req.header('Authorization'); 
    
    if(!token){      // si no se encuentra el token devuelve el siguiente error 
      return res.status(403).json({message:'Se necesita token para acceder'});
    }
  
    try{
  
      const tokenSinPrefijo = token.replace('Bearer ', ''); // Se extrae el token de 'Authorization' pero se elimina el prefijo 'Bearer' 
  
      const decodedToken = jwt.verify(tokenSinPrefijo, 'Secreto_XD'); // Se utiliza la biblioteca "jsonwebtoken" para verificar el token 
       // con la clave secreta "Secreto_XD", si es válido, este puede ser decodificado
  
      req.user = {
        id_usuario: decodedToken.id_usuario,
        email: decodedToken.email,
        admin: decodedToken.admin,
        type: decodedToken.type,
        role: decodedToken.role, // Agregar el rol del usuario al objeto req.user
      };
      
    }catch(error){
      res.status(403).json({message:'Token inválido'});
    }
    return next();
};
  
module.exports = {VerificarToken};



// decodedToken;  // La información del usuario decodificada se agrega al objeto ("req.user") para que esté disponible 
// para las rutas
 // en caso de que el token no sea válido, se llama a next() para manejar la solicitud como no autorizada