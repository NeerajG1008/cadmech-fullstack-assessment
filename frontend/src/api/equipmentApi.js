import api from "./axios";

const equipmentApi = {

  // Dashboard
  getDashboardStats: () => {
    return api.get("/stats");
  },

  // Get All Equipment
  getAllEquipment: (params = {}) => {
    return api.get("/equipment", {
      params,
    });
  },

  // Get Equipment By Id
  getEquipmentById: (id) => {
    return api.get(`/equipment/${id}`);
  },

  // Create Equipment
  createEquipment: (equipmentData) => {
    return api.post("/equipment", equipmentData);
  },

  // Update Equipment
  updateEquipment: (id, equipmentData) => {
    return api.put(`/equipment/${id}`, equipmentData);
  },

  // Delete Equipment
  deleteEquipment: (id) => {
    return api.delete(`/equipment/${id}`);
  },
};

export default equipmentApi;