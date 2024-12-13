const mongoose = require('mongoose');
const farmerSchema = mongoose.Schema({
    saralId:{
        type:String,
        required:true,
        unique:true
    },
    farmerName:{
        type:String,
        required:true
    },
    fatherOrHusbandName:{
        type:String,
    },
    contact:{
        type:String,
    },
    state:{
        type:String,
    },
    district:{
        type:String,
    },
    department:{
        type:String,
    },
    product:{
        type:String,
    },
    project:{
        type:String
    },
    block:{
        type:String
    },
    gram_Panchayat:{
        type:String
    },
    village:{
        type:String
    },
    pin:{
        type:Number,
    },
    longitude:{
        type:String
    },
    latitude:{
        type:String
    },

    address:{
        type:String
    },
    installationDate:{
        type:String,
    },
    pump_type:{
        type:String
    },
    installer_name:{
        type:String,
    },
    survey_done:{
        type:Boolean,
    },
    survey_done_date:{
        type:Date
    },
    supplier_selection:{
        type:String
    },
    Supplier_selection_come_in_office:{
        type:String
    },
    HP:{
        type:String
    },
    AC_DC:{
        type:String
    },
    longitude:{
        type:String
    },
    latitude:{
        type:String
    },
    remark:{
        type:String
    },
    created_At:{
        type:Date,
        default:Date.now
    },
    updated_At:{
        type:Date
    },
    created_By:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employee'
    },
    updated_By:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employee'
    }
})

const Farmer = mongoose.model("Farmer", farmerSchema);
module.exports = Farmer;