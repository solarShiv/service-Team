import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaRegRegistered } from "react-icons/fa";
import { FaFileUpload } from "react-icons/fa";
import { FaFilePen } from "react-icons/fa6";
import { GiFarmer } from "react-icons/gi";
import { getCookie } from '../Utils/cookies';

const SideMenubar = () => {
    const [empData, setEmpData] = useState(getCookie('empData') ? JSON.parse(getCookie('empData')) : '');
    useEffect(() => {
        const data = getCookie('empData') ? JSON.parse(getCookie('empData')) : '';
        setEmpData(data);
    }, [])
    console.log(empData);
    return (
        <>
            <div
                className="flex h-[calc(100vh-5rem)] flex-col rounded-xl text-gray-700">
                <div className="p-4 mb-2 firstBgColor">
                    <h5 className="block font-sans text-center text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    <Link to="dashboard">Dashboard </Link>
                    </h5>
                </div>
                { empData?.role === "Admin" && <nav className="flex flex-col gap-1 font-sans text-base font-normal text-blue-gray-700">
                    <div role="button"
                        className="flex items-center border-b-2 secondBorderColor w-full">
                        <div className="grid m-4 place-items-center">
                            {/* icon */} 
                            <FaRegRegistered />
                        </div>
                        <Link to="employeeRegister">Employee Register</Link>
                    </div>
                </nav>}
                {<nav className="flex flex-col gap-1 font-sans text-base font-normal text-blue-gray-700">
                    <div role="button"
                        className="flex items-center border-b-2 secondBorderColor w-full">
                        <div className="grid m-4 place-items-center">
                            {/* icon */} 
                            <GiFarmer />
                        </div>
                        <Link to="ShowFarmerDataDashboard">Farmer Data</Link>
                    </div>
                </nav>}
                { (empData?.role === "Admin" || empData?.role === "Tollfree") && <nav className="flex flex-col gap-1 font-sans text-base font-normal text-blue-gray-700">
                    <div role="button"
                        className="flex items-center border-b-2 secondBorderColor w-full">
                        <div className="grid m-4 place-items-center">
                            {/* icon */} 
                            <GiFarmer />
                        </div>
                        <Link to="farmerRegister">Farmer Register</Link>
                    </div>
                </nav>}
                
                { (empData?.role === "Admin" || empData?.role === "Tollfree") && <nav className="flex flex-col gap-1 font-sans text-base font-normal text-blue-gray-700">
                    <div role="button"
                        className="flex items-center border-b-2 secondBorderColor w-full">
                        <div className="grid m-4 place-items-center">
                            {/* icon */} 
                            <FaFilePen  className='text-dark'/>
                        </div>
                        <Link to="complaintRegister">Complaint Register</Link>
                    </div>
                </nav>}
                {(empData?.role === "Admin" || empData?.role === "Service" || empData?.role === "Tollfree") && <nav className="flex flex-col gap-1 font-sans text-base font-normal text-blue-gray-700">
                    <div role="button"
                        className="flex items-center border-b-2 secondBorderColor w-full">
                        <div className="grid m-4 place-items-center">
                            {/* icon */} 
                            <FaFilePen  className='text-dark'/>
                        </div>
                        <Link to="complaintList">Complaint List</Link>
                    </div>
                </nav>}
                {(empData?.role === "Admin" || empData?.role === "Service") && <nav className="flex flex-col gap-1 font-sans text-base font-normal text-blue-gray-700">
                    <div role="button"
                        className="flex items-center border-b-2 secondBorderColor w-full">
                        <div className="grid m-4 place-items-center">
                            {/* icon */} 
                            <FaFileUpload  className='text-dark'/>
                        </div>
                        <Link to="excelUpload">Excel Upload</Link>
                    </div>
                </nav>}
                {(empData?.role === "Admin" || empData?.role === "Service" || empData?.role === "Tollfree" ) && <nav className="flex flex-col gap-1 font-sans text-base font-normal text-blue-gray-700">
                    <div role="button"
                        className="flex items-center border-b-2 secondBorderColor w-full">
                        <div className="grid m-4 place-items-center">
                            {/* icon */} 
                            <FaFilePen  className='text-dark'/>
                        </div>
                        <Link to="report">Report</Link>
                    </div>
                </nav>}
            </div>
        </>
    )
}

export default SideMenubar
