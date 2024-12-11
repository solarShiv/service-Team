const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const Employee = require('../../models/auth/employee.model');
const generateAccessToken = require('../../helpers/token/accessToken');
const generateRefreshToken = require('../../helpers/token/refreshToken');
const convertToUpperCase = require('../../helpers/common/convertToUpperCase');
const insertOne = require('../../utils/common/mongoose/insertOne');
const Role = require("../../models/auth/role.model");
const find = require('../../utils/common/mongoose/find');
const register = async(req,res) =>{
    const empIdz = req.empId;
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(500).json({
                success:false,
                errors:errors.array()
            })
        }
        const { empId, name, mobile, password, department } = req.body;
        const upperCaseEmpId = await convertToUpperCase(empId);
        const existingUser = await Employee.findOne({$or:[{mobile},{empId}]}).exec();
        if (existingUser) {
            let conflictField = existingUser.mobile === mobile ? mobile : empId; 
            if(existingUser.mobile === mobile && existingUser.empId === empId) conflictField = mobile + " & " + empId; 
            return res.status(400).json({
                success:false,
                message: `The ${conflictField} is already registered.`,
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newRegister = new Employee({
            empId:upperCaseEmpId,
            name,
            mobile,
            password :hashedPassword,
            role:department,
            created_By:empIdz
        });
        const savedRegister = await newRegister.save();
        return res.status(200).json({
            success:true,
            message:'Register successful',
            data:savedRegister
        });
    } catch (error) {
        // check duplicate 
        if (error.code === 11000) {
            return res.status(400).json({
                message: 'Duplicate field value entered',
                data: Object.keys(error.keyValue),
            });
        }
        return res.status(400).json({
            success:false,
            message:'Something is wrong please connect with developer.',
            data:error
        })
    }
}

const login = async(req,res) =>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(500).json({
                success:false,
                errors:errors.array()
            })
        }
        const empIdOrMobile = req.body.empIdOrMobile;
        let empData = await Employee.findOne({$or:[{empId:empIdOrMobile},{mobile:empIdOrMobile}]}).lean();
        console.log(empData);
        if(!empData){
            return res.status(400).json({
                success:false,
                message:'Employee Id Or mobile number are incorrect.'
            })
        }
        const passwordCompare = await bcrypt.compare(req.body.password,empData.password);
        if(!passwordCompare){
            return res.status(400).json({
                success:false,
                message:'Credential are incorrect.'
            })
        }
        const refreshToken = await generateRefreshToken({empData:empData._id});
        await Employee.findByIdAndUpdate(
            empData._id,
            {$set:{refreshToken:refreshToken}},
            {new:true}
        );
        delete empData.password;
        delete empData.create_At;
        delete empData.updated_At;
        delete empData.__v;
        delete empData.refreshToken;
        const accessToken = await generateAccessToken({empData:empData});
        delete empData._id;

        const option ={
            maxAge: 32400000,
            httpOnly:true,
            secure:false
        }
        return res.status(200)
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", refreshToken, option)
        .json({
            success:true,
            message:'Login successful.',
            data:empData,
            token: refreshToken
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:'something is wrong please connect with developer.'
        })
    }
}
const logout = async(req,res) =>{
    try {
        const empId = req.empId;
        const responseData = await Employee.findByIdAndUpdate(
            empId,
            {$set:{refreshToken:null}},
            {new:true}
        )
        if(responseData){
            return res.status(200)
            .clearCookie('accessToken')
            .clearCookie('refreshToken')
            .json({
                success:true,
                response:"User logout successfully"
            })
        }
        return res.status(400).json({
            success:false,
            response:"Something is wrong please try again"
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:'something is wrong please connect with developer.'
        })
    }
}
const roleAdd = async(req,res) =>{
    try {
        const empId = req.empId;
        const {role}= req.body;
        const data = {
            role,
            created_By:empId
        }
       const responseData = await insertOne(Role,data);
       if(responseData){
           return res.status(200).json({
                success:true,
                message:'Department added successfully',
            })
       } 
    } catch (error) {
        console.log("departmentError",error);
        return res.status(400).json({
            success:false,
            message:'something is wrong please connect with developer.'
        })
    }
}


const roleShow = async(req,res) =>{
    try {
        const select ="role";
        const responseData = await find(Role, null, select );
        if(responseData){
            return res.status(200).json({
                success:true,
                message:'All Roles',
                data:responseData
            })
        }
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:'something is wrong please connect with developer.'
        })
    }
}
module.exports ={
    register,
    login,
    logout,
    roleAdd,
    roleShow
}



// const = async(req,res) =>{
//     try {
//         return res.status(200).json({
//             success:true,
//             message:'',
//             data:''
//         })
//     } catch (error) {
//         return res.status(400).json({
//             success:false,
//             message:'something is wrong please connect with developer.'
//         })
//     }
// }