import React, { useState } from 'react';
import { useEffect } from 'react';
import {checkSaralIdIsExist} from '../../Utils/APIs/checkSaralIdIsExistAPI.js';
import { insertData } from '../../Utils/APIs/commonInsertAPI.js';
import CommonDropdown from '../../Components/common/commonDropdown.js';
import { getCookie } from '../../Utils/cookies.js';
import { useNavigate } from 'react-router-dom';

const Index = () => {
    const Navigate = useNavigate();
    useEffect(() => {
        const token = getCookie('token');
        if(!token){
          Navigate('/');
        } 
      }, []);
    const [farmerDetails, setFarmerDetails] = useState({});
    const [farmerExist, setFarmerExist] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [saralId,setSaralId] = useState();
    const [complainant,setComplainant] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [authority, setAuthority] = useState("");
    const [priority, setPriority] = useState("");
    const [company, setCompany] = useState("");
    const [complaintDetails, setComplaintDetails] = useState("");
    const [responseData, setResponseData] = useState("");
    // error hooks
    const [complainantError, setComplainantError] = useState(false);
    const [contactError, setContactError] = useState(false);
    const [authorityError, setAuthorityError] = useState(false);
    const [priorityError, setPriorityError]= useState(false);
    const [companyError, setCompanyError] = useState(false);
    const [complaintError, setComplaintError] = useState(false);
    const isExistSaralId = async() =>{
        await checkSaralIdIsExist(saralId, setFarmerDetails, setFarmerExist, setResponseMessage);
    }
    const handleAuthorityChange = (authorityName) => {
        setAuthority(authorityName)
    }

    const handleCompanyChange = (companyName) =>{
        setCompany(companyName);
    }

    const complaintData = {
        "farmerId":farmerDetails?._id,
        "complainantName":complainant,
        contact,
        address,
        "pin":pinCode,
        authority,
        priority,
        company,
        complaintDetails
    }
    const handleComplaintForm = async(e) =>{
        e.preventDefault();
        (complainant === "") ? setComplainantError(true) : setComplainantError(false);
        (contact.length < 10 ) ? setContactError(true) : setContactError(false);
        (authority === "") ? setAuthorityError(true) : setAuthorityError(false);
        (priority === "") ? setPriorityError(true) : setPriorityError(false);
        (company === "") ? setCompanyError(true) : setCompanyError(false);
        (complaintDetails === "") ? setComplaintError(true) : setComplaintError(false);
        const path = 'farmer/addComplaint';
        if(!complainantError && !contactError && !authorityError && !priorityError && !companyError && !complaintError){
            await insertData(path, setResponseData, complaintData);
        }
    }
    return (
        <>
            <div className=" flex flex-col">
                <div>
                    <h1 className=' text-3xl font-semibold tracking-widest text-center p-2 bg-gray-50  rounded-lg'>C<span className='text-lg'>OMPLAINT</span> R<span className='text-lg'>EGISTRATION</span></h1>
                </div>
                    <div className="grid gap-3 m-6 md:grid-cols-4">
                        <div>
                            <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Saral ID<span className='text-red-500 fixed h-3'>*</span></label>
                            <input type="text" id="first_name" onChange={(e) => { setSaralId(e.target.value) }} value={saralId} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5" placeholder="Saral Id" required />
                        </div>
                        <div>
                            {saralId && <button type="button" onClick={isExistSaralId} className="text-white mt-7 bg-yellow-500 ml-6 hover:bg-yellow-400 font-medium rounded-sm text-sm w-full sm:w-auto px-5 py-2.5 text-center">Find</button>}
                        </div>
                        <div><h1 className='text-2xl tracking-widest ' style={{ color: responseMessage === "Farmer Exist" ? 'rgb(0, 250, 0)' : 'rgb(255, 0, 0)'}}>{responseMessage}</h1></div>
                    </div>
                {farmerDetails && Object.keys(farmerDetails).length > 0 ? (
                    <table className=' table-fixed bg-white border mx-6 border-gray-300 rounded-lg '>
                        <tr className='bg-gray-100 border-b hover:bg-gray-300'><th className='text-left pl-6 text-gray-700 font-semibold'>Farmer:</th> <td className='text-gray-700'>{farmerDetails.farmerName}</td> <th className='text-left pl-6 text-gray-600 font-semibold'>District :</th><td className='text-gray-700'>{farmerDetails.district}</td></tr>
                        <tr className='bg-gray-100 border-b hover:bg-gray-300'><th className='text-left pl-6 text-gray-700 font-semibold'>Contact_No. </th> <td className='text-gray-700'>{farmerDetails.contact}</td><th className='text-left pl-6 text-gray-600 font-semibold'>Installation Date :</th><td className='text-gray-700'>{farmerDetails.installationDate}</td></tr>
                        <tr className='bg-gray-100 border-b hover:bg-gray-300'><th className='text-left pl-6 text-gray-700 font-semibold'>State :</th><td className='text-gray-700'>{farmerDetails.state}</td><th className='text-left pl-6 text-gray-600 font-semibold'>Department :</th><td className='text-gray-700'>{farmerDetails.department}</td></tr>
                        <tr className='bg-gray-100 border-b hover:bg-gray-300'><th className='text-left pl-6 text-gray-700 font-semibold'>District :</th><td className='text-gray-700'>{farmerDetails.district}</td><th className='text-left pl-6 text-gray-600 font-semibold'>Product :</th><td className='text-gray-700'>{farmerDetails.product}</td></tr>
                        <tr className='bg-gray-100 border-b hover:bg-gray-300'><th className='text-left pl-6 text-gray-700 font-semibold'>Block :</th><td className='text-gray-700'>{farmerDetails.block}</td><th className='text-left pl-6 text-gray-600 font-semibold'>Project :</th><td className='text-gray-700'>{farmerDetails.project}</td></tr>
                    </table>
                ) : ''}
                    <form onSubmit={handleComplaintForm}>
                    <div className="grid gap-3 m-6 md:grid-cols-4">
                        <div>
                            <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Complainant Name<span className='text-red-500 fixed h-3'>*</span></label>
                            <input type="text" id="first_name" value={complainant} onChange={(e) => { setComplainant(e.target.value) }}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5" placeholder="Complainant Name" />
                            {complainantError && <span className='text-red-500 text-xs ml-2'>Complainant Name are required.</span>}
                        </div>
                        <div>
                            <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact Number<span className='text-red-500 fixed h-3'>*</span></label>
                            <input type="number" id="first_name" value={contact} onChange={(e) => { setContact(e.target.value)}}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5" placeholder="Contact Number" />
                            {contactError && <span className='text-red-500 text-xs ml-2'>Contact number are most be 10 digits required.</span>}
                        </div>
                        <div>
                            <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address (If change)</label>
                            <input type="text" id="first_name" value={address} onChange={(e) => {setAddress(e.target.value)}}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5" placeholder="Address" />
                        </div>
                        <div>
                            <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">PIN CODE</label>
                            <input type="text" id="first_name" value={pinCode} onChange={(e) => { setPinCode(e.target.value) }}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5" placeholder="Pin code" />
                        </div>
                        <div>
                            <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">AUTHORITY<span className='text-red-500 fixed h-3'>*</span></label>
                            <CommonDropdown Api_path={"common/showAuthority"} value={authority} onChange={handleAuthorityChange} label={"Authority"} />
                            {authorityError && <span className='text-red-500 text-xs ml-2'>Select any one Authority.</span>}

                        </div>
                        <div>
                            <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">PRIORITY<span className='text-red-500 fixed h-3'>*</span></label>
                            <select onChange={(e) =>{setPriority(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " id="state-select">
                                <option value="">-- select Priority --</option>
                                <option key={1} value="Normal">Normal</option>
                                <option key={1} value="Urgent">Urgent</option>
                                <option key={1} value="Most Urgent">Most Urgent</option>
                            </select>
                            {priorityError && <span className='text-red-500 text-xs ml-2'>Select Priority</span>}
                        </div>
                        <div>
                            <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose Company Name<span className='text-red-500 fixed h-3'>*</span></label>
                            <CommonDropdown Api_path={"common/showCompany"} value={company} onChange={handleCompanyChange} label={"Company"} />
                            {companyError && <span className='text-red-500 text-xs ml-2'>Select Company</span>}
                        </div>
                        <div>
                            <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Complaint Details<span className='text-red-500 fixed h-3'>*</span></label>
                            <input type="text" id="first_name" value={complaintDetails} onChange={(e) => { setComplaintDetails(e.target.value) }}  className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5" placeholder="Complaint Details" />
                            {complaintError && <span className='text-red-500 text-xs ml-2'>Write Complaint details.</span>}
                        </div>
                        <div>
                            {farmerExist && <button type="Submit" className="text-white mt-2 bg-yellow-500 hover:bg-yellow-400 font-medium rounded-sm text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>}
                        </div>
                    </div>
                    </form>
                    {responseData}
            </div>
        </>
    )
}

export default Index
