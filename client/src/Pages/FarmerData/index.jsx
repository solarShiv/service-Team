import React,{ useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../Utils/cookies';
import { showFarmerApi } from '../../Utils/APIs/showFarmerAPI';
import { MdPersonSearch } from "react-icons/md";
import { GoSearch } from "react-icons/go";

const Index = () => {
    const Navigate = useNavigate();
    useEffect(() => {
        const token = getCookie('token');
        if(!token){
          Navigate('/');
        } 
      }, []);

    const LIMIT = 20;
    const [SrNo, setSrNo] = useState(1);
    const [page, setPage] = useState(1);
    const filters = `limit=${LIMIT}&page=${page}`;
    const [ showFarmerData, setFarmerData ] = useState([]);
    const [complaintId, setComplaintId] = useState();
    const [ storeSearchedValue, setSearchedValue ] = useState('');
    const [ searchBtnClicked, setSearchBtnClicked ] = useState(false);
    const [serachOptionClicked, setSearchOptionClicked ] = useState(false);
    useEffect(() => { 
        console.log(storeSearchedValue);
        showFarmerApi(`farmer/showFarmer?limit=${LIMIT}&page=${page}&saralId=${storeSearchedValue}`,setFarmerData).then((status) => {
            if(status){
                setSearchBtnClicked(false);
            }
        });
    }, [page, searchBtnClicked]);

    // useEffect(() => {
    //     showFarmerApi(`farmer/showFarmer?limit=${LIMIT}&page=${page}&saralId=${storeSearchedValue}`,setFarmerData).then((status) => {
    //         if(status){
    //             setSearchBtnClicked(false);
    //         }
    //     });
    // }, [searchBtnClicked]);

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
                <table className="  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" style={{ position: 'relative'}}>
                    <div style={{ position: 'fixed', display: 'flex', justifyContent: 'space-between', alignItems: 'center', bottom: 80, zIndex: 100, border: '2px solid rgb(255, 200, 0)', borderRadius: '5px', background: '#fff', padding: '0px 4px' }}>
                        {serachOptionClicked && <input type="text" name="searchValue" value={storeSearchedValue} onChange={(event) => { console.log(event.target.value);setSearchedValue(event.target.value)}} style={{ outline: 'none',  width: '81.5vw', padding: '8px'   }} />}
                        {serachOptionClicked && <GoSearch size={25} onClick={() => {setSearchBtnClicked(true); setSearchOptionClicked(false)} }/>}
                    </div>
                    {!serachOptionClicked && <div style={{ position: 'fixed', right: 32, bottom: 95 }} onClick={() => setSearchOptionClicked(true)}>
                        <MdPersonSearch size={50} color='rgb(255, 200, 0)' />
                    </div>}
                    <thead className="text-xs border border-gray-150 bg-gray-800 text-gray-100 uppercase dark:bg-gray-800 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">SaralId</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">Farmer Name</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">FatherOrHusbandName</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">Contact</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">State</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">District</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">Address</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">Block</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">Village</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">Gram Panchayat</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">Department</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">Installer Name</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">Product</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">Project</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">Pump Type</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">Survey Status</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">Survey Date</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">HP</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">AC_DC</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        showFarmerData.map(({AC_DC,HP,address,block,contact,department,district,farmerName,fatherOrHusbandName,gram_Panchayat,installer_name,product,project,pump_type,saralId,state,survey_done,survey_done_date,village,_id} , index) =>(
                            <>
                                <tr className="bg-white border-b hover:bg-gray-400 hover:text-gray-900" key={_id} >
                                    {/* <th scope="row" className="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {(SrNo++) + ((page - 1) * LIMIT)}
                                    </th> */}
                                    <th scope="row" className="px-2 font-medium text-center text-gray-900 whitespace-nowrap ">
                                        {saralId}
                                    </th>
                                    <td className="px-2 text-center">
                                        {farmerName}
                                    </td>
                                    <td className="px-2 text-center">
                                        {fatherOrHusbandName}
                                    </td>
                                    <th scope="row" className="px-2 font-medium text-center text-gray-900">
                                        {contact}
                                    </th>
                                    <td className="px-2 text-center">
                                        {state}
                                    </td>
                                    <td className='text-center'>
                                        <div className="group relative">
                                            <span className="block overflow-hidden h-10 max-w-auto group-hover:h-auto">{district}</span>
                                        </div>
                                    </td>
                                    <td className="px-2 text-center">
                                        {address || 'N/A'}
                                    </td>
                                    <td className="px-2 text-center">
                                        {block || 'N/A'}
                                    </td>
                                    <td className="px-2 text-center">
                                        {village || 'N/A'}
                                    </td>
                                    <td className="px-2 text-center">
                                        {gram_Panchayat || 'N/A'}
                                    </td>
                                    <td className="px-2 text-center">
                                        {department || 'N/A'}
                                    </td>
                                    <td className="px-2 text-center">
                                        {installer_name || 'N/A'}
                                    </td><td className="px-2 text-center">
                                        {product || 'N/A'}
                                    </td>

                                    <td className="px-2 text-center">
                                        {project || 'N/A'}
                                    </td>
                                    <td className="px-2 text-center">
                                        {pump_type || 'N/A'}
                                    </td>
                                    <td className="px-2 text-center">
                                        {survey_done ? 'YES' : 'NO'}
                                    </td>
                                    <td className="px-2 text-center">
                                        {survey_done_date || 'N/A'}
                                    </td>
                                    <td className="px-2 text-center">
                                        {HP}
                                    </td>
                                    <td className="px-2 text-center">
                                        {AC_DC}
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

export default Index;