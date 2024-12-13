const fieldStageAcitivy = require('../../models/fieldService/fieldStageAcitivy.model');
const Complaint = require('../../models/farmer/complaint.model');
const insertOne = require('../../utils/common/mongoose/insertOne')
const update = require("../../utils/common/mongoose/update");
const find = require("../../utils/common/mongoose/find")
const complaintAccept = async(req,res) =>{
    try {
        // const {complaintAccept} = req.query || req.body || req.parmes; 
        const stageId = (req.body.complaintAccept) ? "675aaf9c44c74418017c1dae" : "675aaf9c44c74418017c1daf";    
        const updateData ={
            stage:stageId,
            updated_At:Date.now()
        }
        const insertResponse = await insertOne(fieldStageAcitivy, {...req.body,stageId });
        const updateResponse = await update(Complaint, req.body.complaintId, updateData);
        
        if(insertResponse && updateResponse) {
            return res.status(200).json({
                success:true,
                message:'Complaint Update Successfully.'
            })
        }
        return res.status(400).json({
            success:false,
            message:'Something is wrong please try again.'
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"Something is wrong please connect with developer"
        })
    }
}

module.exports = {
    complaintAccept
}