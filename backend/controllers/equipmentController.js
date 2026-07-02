const equipmentModel = require("../models/equipmentModel");
const {successResponse, errorResponse,} = require("../utils/response");

const equipmentController = {
    async getAllEquipment(req, res){
        try{
            const equipment = await equipmentModel.getAllEquipment();

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
}

module.exports = equipmentController;