import React,{ useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {showData} from '../../Utils/APIs/commonShowAPI'
import { getCookie } from '../../Utils/cookies';
const Index = () => {
    const navigate = useNavigate();
    const Navigate = useNavigate();
    useEffect(() => {
        const token = getCookie('token');
        if(!token){
          Navigate('/');
        } 
      }, []);
    
    const empData = JSON.parse(getCookie('empData'));
    console.log(empData);
    const LIMIT = 13;
    var SrNo = 1;
    const [page, setPage] = useState(1);
    const filters = `limit=${LIMIT}&page=${page}`
    const [ complaintData, setComplaintData] = useState([]);
    const [complaintId, setComplaintId] = useState();
    useEffect(() => {
        showData(`farmer/showComplaint?${filters}`,setComplaintData)
    }, [page]);

    const updateComplaint =(e, id) => {
        setComplaintId(id);
        const complaintId = {id: id};
        if(empData?.role === "Admin"){
            console.log("Hello welcome");
            navigate('/complaintList', { state: complaintId});
        }
        else if( empData?.role === "Service"){
            navigate('/dashboard/complaintDetails',{state: complaintId});
        }
        else{
            navigate('/dashboard/verifyComplaint',{state: complaintId});
        }
    }
    return (
        <>
            <button className='p-1 pl-5 pr-5 rounded-md absolute bottom-4 left-64 text-white bg-gray-800' onClick={()=>{setPage(page-1)}}>
                Back
            </button>
            <button className='p-1 pl-5 pr-5 rounded-md absolute bottom-4 right-16 text-white bg-gray-800' onClick={()=>{setPage(page+1)}}>
                Forward
            </button>
            <div className='overflow-auto h-[calc(100vh-8rem)]'>
            <div className="relative">
                <table className="  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs border border-gray-150 bg-gray-800 text-gray-100 uppercase dark:bg-gray-800 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">#</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">Tracking Id</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">Complainant Name</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">Complainant Contact</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">Authority</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">Priority</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">Company</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">Complaint Details</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">Saral Id</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">Farmer Name</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">Contact</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">State</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">District</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">Pin Code</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">HP</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">Stage</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">Employee</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        complaintData.map((data , index) =>(
                            <>
                                <tr className="bg-white border-b hover:bg-gray-400 hover:text-gray-900"  onClick={(e)=>{updateComplaint(e,data._id)} }>
                                    <th scope="row" className="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {(SrNo++) + ((page - 1) * LIMIT)}
                                    </th>
                                    <th scope="row" className="px-2 font-medium text-center text-gray-900 whitespace-nowrap ">
                                        {data.trackingId}
                                    </th>
                                    <td className="px-2 text-center">
                                        {data.ComplainantName}
                                    </td>
                                    <td className="px-2 text-center">
                                        {data.contact}
                                    </td>
                                    <td className="px-2  text-center">
                                        {data.authority}
                                    </td>
                                    <th scope="row" className="px-2 font-medium text-center text-gray-900">
                                        {data.priority}
                                    </th>
                                    <td className="px-2 text-center">
                                        {data.company}
                                    </td>
                                    <td className='text-center'>
                                        <div className="group relative">
                                            <span className="block overflow-hidden h-10 max-w-auto group-hover:h-auto">{data.complaintDetails}</span>
                                        </div>
                                    </td>
                                    <td className="px-2 text-center">
                                        {data?.Farmer[0]?.saralId}
                                    </td>
                                    <td className="px-2 text-center">
                                        {data?.Farmer[0]?.farmerName}
                                    </td>
                                    <td className="px-2 text-center">
                                        {data?.Farmer[0]?.contact}
                                    </td>
                                    <td className="px-2 text-center">
                                        {data?.Farmer[0]?.state}
                                    </td>
                                    <td className="px-2 text-center">
                                        {data?.Farmer[0]?.district}
                                    </td>
                                    <td className="px-2 text-center">
                                        {data?.Farmer[0]?.pin}
                                    </td><td className="px-2 text-center">
                                        {data?.Farmer[0]?.HP}
                                    </td>

                                    <td className="px-2">
                                        {data?.Stage[0]?.stage}
                                    </td>
                                    <td className="px-2">
                                        {data?.Employee[0]?.name}
                                    </td>
                                </tr>
                            </>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
         
        </>
    )
}

export default Index
