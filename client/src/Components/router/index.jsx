import React from "react";
import { Route, Routes  } from "react-router-dom";
import Login from "../../Pages/Login/Login";
import Dashboard from "../../Pages/Dashboard/Index";
import FarmerRegister from '../../Pages/FarmerRegisterForm/Index';
import ExcelUpload from '../../Pages/ExcelUpload/index.jsx'
import ComplaintRegister from '../../Pages/ComplaintRegister/Index.jsx'
import ComplaintList from '../../Pages/ComplaintList/Index.jsx'
import ComplaintDetails from '../../Pages/ComplaintDetails/Index.jsx';
import Report from '../../Pages/Report/index.jsx';
import VerifyComplaint from '../../Pages/verifyComplaint/Index.jsx';
import EmployeeRegister from '../../Pages/EmployeeRegistration/index.jsx';
import ShowFarmerDataDashboard from '../../Pages/FarmerData/index.jsx';

const Index = () => {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} >
          <Route path='farmerRegister' element={<FarmerRegister/>} />
          <Route path='complaintRegister' element={<ComplaintRegister/>} />
          <Route path='excelUpload' element ={<ExcelUpload/>} />
          <Route path="complaintList" element={<ComplaintList />} />
          <Route path="complaintDetails" element={<ComplaintDetails/>} />
          <Route path="verifyComplaint" element={<VerifyComplaint/>} />
          <Route path="report" element={<Report/>} />
          <Route path="employeeRegister" element={<EmployeeRegister />} />
          <Route path="ShowFarmerDataDashboard" element={<ShowFarmerDataDashboard />} />
        </Route>
    </Routes>
  );
};

export default Index;