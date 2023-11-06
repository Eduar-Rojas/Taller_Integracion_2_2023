const db = require('../db/db'); // Importa la instancia de cliente de db.js

// Controlador para actualizar el perfil del usuario
const updateUserProfile = async (id_usuario, email) => {
  try {
    // Realiza la actualización en la base de datos
    const updatedUser = await db.oneOrNone('UPDATE registro SET  id_usuario = $1, email = $2 WHERE id_usuario = $3',  [id_usuario, email, id_usuario]);

    if (!updatedUser) {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      throw error;
    }

    return updatedUser;
  } catch (error) {
    console.error('Error al actualizar el perfil de usuario:', error);
    throw new Error('Error al actualizar el perfil de usuario');
  }
};

module.exports = {
  updateUserProfile,
};
