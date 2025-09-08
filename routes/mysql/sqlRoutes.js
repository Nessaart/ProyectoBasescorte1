const express = require("express");
const SqlService = require("../../services/sqlService");

const router = express.Router();
const tableName = "descuento"; 

// ========== CREATE ==========
router.post('/create', async (req, res) => {
  const { id_negocio, descripcion, porcentaje, condiciones, fecha_inicio, fecha_fin } = req.body;
  if (!id_negocio || !descripcion || !porcentaje) {
    return res.status(400).send("Campos obligatorios faltantes.");
  }

  const db = new SqlService();
  try {
    await db.connectToDb();
    await db.query(
      `INSERT INTO ${tableName} (id_negocio, descripcion, porcentaje, condiciones, fecha_inicio, fecha_fin)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id_negocio, descripcion, porcentaje, condiciones, fecha_inicio, fecha_fin]
    );
    res.status(200).send("Descuento creado exitosamente.");
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Error al crear descuento.");
  } finally {
    await db.closeConnection();
  }
});

// ========== READ ALL ==========
router.get('/get-all', async (req, res) => {
  const db = new SqlService();
  try {
    await db.connectToDb();
    const data = await db.query(`SELECT * FROM ${tableName}`);
    res.status(200).json(data);
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Error al obtener descuentos.");
  } finally {
    await db.closeConnection();
  }
});

// ========== READ ONE ==========
router.get('/get-one/:id', async (req, res) => {
  const db = new SqlService();
  try {
    await db.connectToDb();
    const result = await db.query(
      `SELECT * FROM ${tableName} WHERE id_descuento = ?`,
      [req.params.id]
    );
    await db.closeConnection();

    if (result.length === 0) {
      res.status(404).send("Descuento no encontrado.");
    } else {
      res.status(200).json(result[0]);
    }
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Error al obtener descuento.");
  }
});

// ========== UPDATE ==========
router.put('/update/:id', async (req, res) => {
  const { descripcion, porcentaje, condiciones, fecha_fin } = req.body;
  const db = new SqlService();

  try {
    await db.connectToDb();
    await db.query(
      `UPDATE ${tableName}
       SET descripcion = ?, porcentaje = ?, condiciones = ?, fecha_fin = ?
       WHERE id_descuento = ?`,
      [descripcion, porcentaje, condiciones, fecha_fin, req.params.id]
    );
    res.status(200).send("Descuento actualizado correctamente.");
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Error al actualizar descuento.");
  } finally {
    await db.closeConnection();
  }
});

// ========== DELETE ==========
router.delete('/delete/:id', async (req, res) => {
  const db = new SqlService();
  try {
    await db.connectToDb();
    await db.query(
      `DELETE FROM ${tableName} WHERE id_descuento = ?`,
      [req.params.id]
    );
    res.status(200).send("Descuento eliminado.");
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Error al eliminar descuento.");
  } finally {
    await db.closeConnection();
  }
});

module.exports = router;





//lo del profe
// 


// const express = require("express");
// const SqlService = require("../../services/sqlService");

// const router = express.Router();


// // ========== Post entry to table ==========
// router.post('/post', async (req, res) => {
//   const { param1, param2, paramN } = req.body;
//   if (!param1 || !param2 || !paramN) {
//     return res.status(400).send("Missing fields.");
//   }

//   const db = new SqlService();
//   const tableName = "test_table"
//   try {
//     await db.connectToDb();
//     await db.query(
//       `INSERT INTO ${tableName} (param1, param2, paramN) VALUES (?, ?, ?)`,
//       [param1, param2, paramN]
//     );
//     res.status(200).send("Entry created");
//   } catch (err) {
//     console.error("SQL error:", err);
//     res.status(500).send("Error creating entry.");
//   } finally {
//     await db.closeConnection();
//   }
// });

// // ========== Get all entries of a table ==========
// router.get('/get-all', async (req, res) => {
//   const db = new SqlService();
//   const tableName = "test_table"
//   try {
//     await db.connectToDb();
//     const data = await db.query(`SELECT * FROM ${tableName}`);
//     res.status(200).json(data);
//   } catch (err) {
//     console.error("SQL error:", err);
//     res.status(500).send("Error fetching data.");
//   } finally {
//     await db.closeConnection();
//   }
// });

// // ========== Get one entry of a table ==========
// router.get('/get-one/:id', async (req, res) => {
//   const db = new SqlService();
//   const tableName = "test_table"
//   try {
//     await db.connectToDb();
//     const result = await db.query(
//       `SELECT * FROM ${tableName} WHERE id = ?`,
//       [req.params.id]
//     );
//     await db.closeConnection();

//     if (result.length === 0) {
//       res.status(404).send("Entry not found.");
//     } else {
//       res.status(200).json(result[0]);
//     }
//   } catch (err) {
//     console.error("SQL error:", err);
//     res.status(500).send("Error retrieving info.");
//   }
// });
// module.exports = router;