
const db = require('../db/db');

async function DeleteUserProfile(id_usuario, email) {
  try {
    const deletedUser = await db.oneOrNone('DELETE FROM registro WHERE id_usuario = $1  email = $2 RETURNING * ', [ id_usuario,email]);
  
    if (!deletedUser) {
      throw new Error('No se pudo eliminar el perfil del usuario.');
    }
  
    console.log('Cuenta eliminada:', deletedUser);
    
    return deletedUser;
  } catch (error) {
    console.error('Error al eliminar el perfil del usuario:', error);
    throw error;
  }
 }
 

 module.exports = {
  DeleteUserProfile,
 }