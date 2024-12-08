const ComplaintVerify = require('../../models/farmer/complaintVerify.model');
const insertOne = require('../../utils/common/mongoose/insertOne');
const verifyComplaint = async(req,res) =>{
  try {
    const empId = req.empId;
    const {complaintId, remark, farmerCertified} = req.body;
    const data ={
      complaintId, 
      remark, 
      farmerCertified,
      created_By:empId
    }
    const responseData = await insertOne(ComplaintVerify,data)
    if(responseData){
      return res.status(200).json({
        success:true,
        message:'Successfully save verification data.'
      })
    }
  } catch (error) {
    return res.status(400).json({
      success:false,
      message:"something is wrong please connect with developer"
    })
  }
}

module.exports ={
  verifyComplaint
}