const getVentasPorDiaQuery = `
  SELECT diasemana, COUNT(*) as cantidadventas
  FROM ventas
  GROUP BY diasemana
  ORDER BY
    CASE
      WHEN diasemana = 'lunes' THEN 1
      WHEN diasemana = 'martes' THEN 2
      WHEN diasemana = 'miércoles' THEN 3
      WHEN diasemana = 'jueves' THEN 4
      WHEN diasemana = 'viernes' THEN 5
      WHEN diasemana = 'sábado' THEN 6
      WHEN diasemana = 'domingo' THEN 7
      ELSE 8 -- Para cualquier otro valor
    END;
`;

module.exports = {
  getVentasPorDiaQuery,
};