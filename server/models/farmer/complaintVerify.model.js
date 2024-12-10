const mongoose = require("mongoose");
const complaintVerifySchema = mongoose.Schema({
  complaintId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Complaint',
    required:true
  },
  remark:{
    type:String
  },
  farmerCertified:{
    type:Boolean,
    required:true
  },
  created_By:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Employee'
  },
  updated_By:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Employee'
  },
  created_At:{
    type:Date,
    default:Date.now,
    required:true
  },
  updated_At:{
    type:Date,
  }
});
const ComplaintVerify = mongoose.model("ComplaintVerify", complaintVerifySchema);
module.exports = ComplaintVerify;