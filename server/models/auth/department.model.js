const mongoose = require("mongoose")

const departmentSchema = mongoose.Schema({
  department:{
    type:String,
    required:true,
    unique:true
  },
})