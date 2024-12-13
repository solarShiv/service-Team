const mongoose = require('mongoose')

const fieldStageActivitySchema = mongoose.Schema({
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
    fieldEmpId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    complaintAccept:{
        type:Boolean,
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
const FieldStageActivity = mongoose.model("FieldStageActivity", fieldStageActivitySchema);
module.exports = FieldStageActivity;