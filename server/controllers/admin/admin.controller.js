const { mongoose } = require("mongoose");
const startDateConvertor = require("../../helpers/common/dateConversion/startDate");
const endDateConvertor = require('../../helpers/common/dateConversion/endDate');
const Complaint = require('../../models/farmer/complaint.model');
const find = require("../../utils/externalAPI/find");
const XLSX = require('xlsx');
const reportDownLoad = async(req,res) =>{
    try {
        const {stageId, assignEmployee, startDate, endDate, specificDate} = req.query || req.body || req.parames;
        const filters={};
        if(stageId) filters.stage = new mongoose.Types.ObjectId(stageId);
        if(assignEmployee) filters.assignEmployee = new mongoose.Types.ObjectId(assignEmployee);
        if (startDate && endDate) {
            filters.created_At = {
                $gte: await startDateConvertor(startDate),
                $lte: await endDateConvertor(endDate)
            };
        }
        if (specificDate) {
            filters.created_At = {
                $gte: await startDateConvertor(specificDate),
                $lte: await endDateConvertor(specificDate)    // Less than or equal to end of the day
            };
        }
        var responseDate = await Complaint.find(filters)
        .populate({
            path:"farmerId",
            select:{
                "_id":0,
                "fatherOrHusbandName":0,
                "district":0,
                "department":0,
                "product":0,
                "project":0,
                "block":0,
                "gram_Panchayat":0,
                "village":0,
                "pin":0,
                "address":0,
                "installer_name":0,
                "survey_done":0,
                "survey_done_date":0,
                "Supplier_selection_come_in_office":0,
                "remark":0,
                "__v":0,
            }
        })
        .populate({
            path:"stage",
            select:{
                "_id":0,
                "created_At":0,
                "created_By":0,
                "__v":0
            }
        })
        .populate({
            path:"updated_By",
            select:{
                "name":1
            }
        })
        .populate({
            path:"created_By",
            select:{
                "name":1
            }
        })
        .select({
            "authority":0,
            "priority":0,
            "__v":0,
            "address":0,
            "updated_At":0

        });
        let formatedData =[];
        for(let i=0; i<responseDate.length; ++i){
            const assignEmployeeId = responseDate[i].assignEmployee;
            if (assignEmployeeId) {
                try {
                    const API = `http://88.222.214.93:5000/service-team/find-service-person?id=${assignEmployeeId}`
                    // Call the API with the assignEmployee ID
                    const response = await find(API);
                    var employeeName = response.data.data.name;
                } catch (error) {
                    employeeName = "Unknown";
                }
                const temp ={
                    "Farmer Name" : responseDate[i].farmerId.farmerName,
                    "Contact": responseDate[i].farmerId.contact,
                    "state" : responseDate[i].farmerId.state,
                    "Installation Date": responseDate[i].farmerId.installationDate,
                    "Pump Type": responseDate[i].farmerId.pump_type,
                    "HP":responseDate[i].farmerId.HP,
                    "AC/DC":responseDate[i].farmerId.AC_DC,
                    "Farmer Register":responseDate[i].farmerId.created_At,
                    "complainant Name":responseDate[i].complainantName,
                    "Complainee Contact":responseDate[i].contact,
                    "Stage":responseDate[i].stage.stage,
                    "Complaint Register By":responseDate[i].created_By.name,
                    "Assign Employee Name" : employeeName
                };
                formatedData.push(temp);
            }
        }
        if (!formatedData || formatedData.length === 0) {
            return res.status(400).json({
                success:false, 
                message: "There is no record found."
             });
        }
    
        // Convert JSON data to a worksheet
        const ws = XLSX.utils.json_to_sheet(formatedData);
    
        // Create a new workbook and append the worksheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Data");
    
        // Define the file name
        const fileName = "converted_data.xlsx";
    
        // Write the Excel file to a buffer (in-memory)
        const buffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });
    
        // Set the response headers to force download in the browser
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${fileName}"`
        );
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.send(buffer);
        // return res.status(200).json({
        //     success:true,
        //     message:'repoart download successfully',
        //     data:formatedData
        // })
    } catch (error) {
        console.log(error)
        
        // return res.status(400).json({
        //     success:false,
        //     message:'Something is wrong please try again.'
        // })
    }
}
const showEmployees = async(req, res) => {
    try {
        const empData = await Employee.find().select("-password -create_At -created_At -created_By -refreshToken -__v");
        return res.status(200).json({
            success: true,
            message: "Data Fetched Successfully",
            data: empData || []
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};
    
const deleteEmployee = async(req, res) => {
    try{
        const {id} = req.query || req.body || req.parames;
        if(!id){
            return res.status(400).json({
                success: false,
                message: "EmployeeId is required"
            });
        }

        const deleteEmp = await Employee.findByIdAndDelete({_id: id});

        return res.status(200).json({
            success: true,
            data: deleteEmp || []
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

module.exports ={
    reportDownLoad,
    showEmployees,
    deleteEmployee
}