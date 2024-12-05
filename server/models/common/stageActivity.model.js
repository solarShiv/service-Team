const mongoose = require('mongoose')

const stageActivitySchema = mongoose.Schema({
    complaintId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Complaint",
        required:true
    },
    stageId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Stage",
        required:true
    },
    empId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee",
        required:true
    },
    remark:{
        type:String
    },
    created_At:{
        type:Date,
        default:Date.now
    }
});
const StageActivity = mongoose.model("StageActivity", stageActivitySchema);
module.exports = StageActivity