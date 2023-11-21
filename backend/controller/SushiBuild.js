const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Ruta para obtener datos de la tabla Build_Ingredientes
router.get('/SushiBuild', async (req, res) => {
  try {
    const query = `SELECT * FROM "Build_Ingredientes"`;
    const ingredientes = await db.any(query);

    res.status(200).json(ingredientes);
  } catch (error) {
    console.error('Error al obtener datos de construcción de sushi:', error);
    res.status(500).json({ error: 'Error interno del servidor al obtener datos de construcción de sushi' });
  }
});

// Ruta para obtener ingredientes por categoría
router.get('/ingredientes', async (req, res) => {
  const { categoria } = req.query;

  try {
    // Ajustamos la consulta para manejar los casos
    let query;
    if (categoria === 'Proteina') {
      query = `SELECT * FROM "Build_Ingredientes" WHERE categoria ILIKE '%Proteina%'`;
    } else if (categoria === 'Relleno') {
      query = `SELECT * FROM "Build_Ingredientes" WHERE categoria ILIKE '%Relleno%'`;
    } else if (categoria === 'Envoltura') {
      query = `SELECT * FROM "Build_Ingredientes" WHERE categoria ILIKE '%Envoltura%'`;
    } else {
      query = `SELECT * FROM "Build_Ingredientes" WHERE $1 = ANY(string_to_array(categoria, ',')::text[])`;
    }

    const ingredientes = await db.any(query, [categoria]);

    res.status(200).json(ingredientes);
  } catch (error) {
    console.error('Error al obtener ingredientes por categoría:', error);
    res.status(500).json({ error: 'Error interno del servidor al obtener ingredientes por categoría' });
  }
});


module.exports = router;
