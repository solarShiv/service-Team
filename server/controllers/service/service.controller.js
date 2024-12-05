const update = require('../../utils/common/update');
const insertOne = require('../../utils/common/mongoose/insertOne');
const Complaint = require('../../models/farmer/complaint.model');
const StageActivity = require('../../models/common/stageActivity.model');
const updateComplaint  = async(req,res) =>{
    try {
        const empId = req.empId;
        const {stageId, complaintId, assignEmployee, remark} = req.body;
        if(!stageId || !complaintId){
            return res.status(404).json({
                success:false,
                message:"All fields required"
            })
        }
        if(stageId === '67501cde3a9836b55dd9f417' && !assignEmployee){
            return res.status(404).json({
                success:false,
                message:'Field employee are required for assign.'
            })
        }
        const data ={
            complaintId,
            stageId,
            empId,
            remark
        }
        const updateData = {
            stage:stageId,
            assignEmployee
        }
        const insertResponse = await insertOne(StageActivity, data);
        const updateResponse = await update(Complaint, complaintId, updateData);
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
        return res.status(400).json({
            success:false,
            message:'Something is wrong please connect with developer.'
        })
    }
}
module.exports ={
    updateComplaint
}

// const  = async(req,res) =>{
//     try {
        
//     } catch (error) {
//         return res.status(400).json({
//             success:false,
//             message:'Something is wrong please connect with developer.'
//         })
//     }
// }