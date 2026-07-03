const equipmentModel = require("../models/equipmentModel");
const {successResponse, errorResponse,} = require("../utils/response");

const equipmentController = {
    async getAllEquipment(req, res){
        try{
          const { search, type, status } = req.query;

          const equipment =
          await equipmentModel.getAllEquipment({
              search,
              type,
              status,
          });

            return successResponse(
                res,
                equipment,
                "Equipment fetched successfully"
              )
        } catch (error){
            console.error("Error fetching equipment : ", error);

            return errorResponse(
                res,
                "Failed to fetch equipment"
              )
        }
    },


    async getEquipmentById(req, res) {
        try {
          const { id } = req.params;
      
          if (!id || isNaN(id)) {
            return errorResponse(
              res,
              "Invalid equipment id",
              400
            );
          }

          
      
          const equipment = await equipmentModel.getEquipmentById(id);
      
          if (!equipment) {
            return errorResponse(
              res,
              "Equipment not found",
              404
            );
          }
      
          return successResponse(
            res,
            equipment,
            "Equipment fetched successfully"
          );
      
        } catch (error) {
          console.error(error);
      
          return errorResponse(
            res,
            "Failed to fetch equipment"
          );
        }
      },

      async createEquipment(req, res) {
        try {
          const {
            name,
            type,
            status,
            location,
            serial_number,
            description,
            installed_date,
          } = req.body;
      
          // Required field validation
          if (!name || !type || !status) {
            return errorResponse(
              res,
              "Name, type and status are required",
              400
            );
          }
      
          const newEquipment =
            await equipmentModel.createEquipment({
              name,
              type,
              status,
              location,
              serial_number,
              description,
              installed_date,
            });
      
          return successResponse(
            res,
            newEquipment,
            "Equipment created successfully",
            201
          );
      
        } catch (error) {
          console.error(error);
      
          return errorResponse(
            res,
            error.message || "Failed to create equipment"
          );
        }
      },

      async updateEquipment(req, res) {
        try {
          const equipmentId = Number(req.params.id);
      
          if (!Number.isInteger(equipmentId) || equipmentId <= 0) {
            return errorResponse(
              res,
              "Invalid equipment id",
              400
            );
          }
      
          const {
            name,
            type,
            status,
            location,
            serial_number,
            description,
            installed_date,
          } = req.body;
      
          if (!name || !type || !status) {
            return errorResponse(
              res,
              "Name, type and status are required",
              400
            );
          }
      
          // Check if equipment exists
          const existingEquipment =
            await equipmentModel.getEquipmentById(equipmentId);
      
          if (!existingEquipment) {
            return errorResponse(
              res,
              "Equipment not found",
              404
            );
          }
      
          const updatedEquipment =
            await equipmentModel.updateEquipment(
              equipmentId,
              {
                name,
                type,
                status,
                location,
                serial_number,
                description,
                installed_date,
              }
            );
      
          return successResponse(
            res,
            updatedEquipment,
            "Equipment updated successfully"
          );
      
        } catch (error) {
          console.error(error);
      
          return errorResponse(
            res,
            error.message || "Failed to update equipment"
          );
        }
      },

      async deleteEquipment(req, res) {
        try {
          const equipmentId = Number(req.params.id);
      
          if (!Number.isInteger(equipmentId) || equipmentId <= 0) {
            return errorResponse(
              res,
              "Invalid equipment id",
              400
            );
          }
      
          // Check if equipment exists
          const existingEquipment =
            await equipmentModel.getEquipmentById(equipmentId);
      
          if (!existingEquipment) {
            return errorResponse(
              res,
              "Equipment not found",
              404
            );
          }
      
          await equipmentModel.deleteEquipment(equipmentId);
      
          return successResponse(
            res,
            null,
            "Equipment deleted successfully"
          );
      
        } catch (error) {
          console.error(error);
      
          return errorResponse(
            res,
            error.message || "Failed to delete equipment"
          );
        }
      },

      async getDashboardStats(req, res) {
        try {
          const stats = await equipmentModel.getDashboardStats();
      
          return successResponse(
            res,
            stats,
            "Dashboard statistics fetched successfully"
          );
      
        } catch (error) {
          console.error(error);
      
          return errorResponse(
            res,
            "Failed to fetch dashboard statistics"
          );
        }
      },
}

module.exports = equipmentController;