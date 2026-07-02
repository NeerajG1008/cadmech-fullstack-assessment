const { pool } = require("../config/db");

const equipmentModel = {
  
  async getAllEquipment() {
    
      const [rows] = await pool.query(`
      SELECT * FROM equipment ORDER BY created_at DESC`);

      return rows;
   
  },

  async getEquipmentById(id){
      
        const [rows] = await pool.query(`
        SELECT * FROM equipment WHERE id = ? `, [id]);
        
        return rows[0];
      
  },

};

module.exports = equipmentModel;
