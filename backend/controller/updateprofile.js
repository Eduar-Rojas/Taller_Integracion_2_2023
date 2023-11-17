// ./controller/updateprofile.js

const db = require('../db/db');

async function updateUserProfile(id_usuario, email) {
  try {
    // Aquí deberías realizar la lógica para actualizar los datos del usuario en tu base de datos.
    // Ejemplo usando un falso método de actualización:
    const updatedUser = await db.oneOrNone('UPDATE registro SET email = $1 WHERE id_usuario = $2 RETURNING *', [email, id_usuario]);

    if (!updatedUser) {
      throw new Error('No se pudo actualizar el perfil del usuario.');
    }

    console.log('Perfil del usuario actualizado:', updatedUser);
    
    // Puedes devolver el usuario actualizado si es necesario
    return updatedUser;
  } catch (error) {
    console.error('Error al actualizar el perfil del usuario:', error);
    throw error;
  }
}

module.exports = {
  updateUserProfile,
};
