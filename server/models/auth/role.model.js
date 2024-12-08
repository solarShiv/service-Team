const mongoose = require("mongoose")

const roleSchema = mongoose.Schema({
  role:{
    type:String,
    required:true,
    unique:true
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
      ref:'Employee',
      required:true
  },
  updated_By:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Employee'
  }
});
const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
