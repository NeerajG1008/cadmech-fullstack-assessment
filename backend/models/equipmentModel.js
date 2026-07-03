const { pool } = require("../config/db");

const equipmentModel = {

  async getAllEquipment(filters) {
    let query = `
      SELECT *
      FROM equipment
      WHERE 1 = 1
    `;
  
    const values = [];
  
    // Search by equipment name
    if (filters.search) {
      query += ` AND name LIKE ?`;
      values.push(`%${filters.search}%`);
    }
  
    // Filter by equipment type
    if (filters.type) {
      query += ` AND type = ?`;
      values.push(filters.type);
    }
  
    // Filter by equipment status
    if (filters.status) {
      query += ` AND status = ?`;
      values.push(filters.status);
    }
  
    query += ` ORDER BY created_at DESC`;
  
    const [rows] = await pool.query(query, values);
  
    return rows;
  },

  async getEquipmentById(id){
      
        const [rows] = await pool.query(`
        SELECT * FROM equipment WHERE id = ? `, [id]);
        
        return rows[0];
      
  },

  async createEquipment(equipmentData) {
    const {
      name,
      type,
      status,
      location,
      serial_number,
      description,
      installed_date,
    } = equipmentData;
  
    const [result] = await pool.query(
      `
      INSERT INTO equipment
      (
        name,
        type,
        status,
        location,
        serial_number,
        description,
        installed_date
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        name,
        type,
        status,
        location,
        serial_number,
        description,
        installed_date,
      ]
    );
  
    const [rows] = await pool.query(
      `
      SELECT *
      FROM equipment
      WHERE id = ?
      `,
      [result.insertId]
    );
  
    return rows[0];
  },

  async updateEquipment(id, equipmentData) {
    const {
      name,
      type,
      status,
      location,
      serial_number,
      description,
      installed_date,
    } = equipmentData;
  
    const [result] = await pool.query(
      `
      UPDATE equipment
      SET
        name = ?,
        type = ?,
        status = ?,
        location = ?,
        serial_number = ?,
        description = ?,
        installed_date = ?
      WHERE id = ?
      `,
      [
        name,
        type,
        status,
        location,
        serial_number,
        description,
        installed_date,
        id,
      ]
    );
  
    if (result.affectedRows === 0) {
      return null;
    }
  
    return await this.getEquipmentById(id);
  },

  async deleteEquipment(id) {
    const [result] = await pool.query(
      `
      DELETE FROM equipment
      WHERE id = ?
      `,
      [id]
    );
  
    return result.affectedRows > 0;
  },

  async getDashboardStats() {
    const [rows] = await pool.query(`
      SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN status = 'Active' THEN 1 ELSE 0 END) AS active,
        SUM(CASE WHEN status = 'Under Maintenance' THEN 1 ELSE 0 END) AS underMaintenance,
        SUM(CASE WHEN status = 'Decommissioned' THEN 1 ELSE 0 END) AS decommissioned
      FROM equipment
    `);
  
    return rows[0];
  },

};

module.exports = equipmentModel;
