import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import {showData} from '../../Utils/APIs/commonShowAPI'
import CommonDropdownWithId from '../../Components/common/commonDropdownWithId'
const Index = () => {
  const location = useLocation();
  const {id} = location.state || {};
  const [complaintData, setComplaintData] = useState({});
  const [stage, setStage] =useState([]);
  const [priority, setPriority] = useState();

    useEffect(() => {
        showData(`farmer/showComplaint?complaintId=${id}`,setComplaintData);
    }, []);


    const handleStageChange = (stage) =>{
      setStage(stage)
    }
  return (
    <>
      <div className=" flex flex-col bg-red-400">
        <div>
          <h1 className=' text-3xl font-semibold tracking-widest text-center p-2 bg-gray-900 text-gray-100'>C<span className='text-lg'>OMPLAINT</span> D<span className='text-lg'>ETAILS</span></h1>
        </div>
        <div className="flex flex-row justify-around bg-gray-200 ">
          <h1 className=' text-2xl font-semibold  tracking-widest p-2'>F<span className='text-lg'>armer</span> N<span className='text-lg'>ame - {complaintData[0]?.Farmer[0]?.farmerName}</span></h1>
          <h1 className=' text-2xl font-semibold  tracking-widest p-2'>S<span className='text-lg'>aral</span> I<span className='text-lg'>d - {complaintData[0]?.Farmer[0]?.saralId}</span></h1>
        </div>
        <div className=" flex flex-row justify-around p-1">
          <div className='border-2'>
            <table className='text-left'>
              <tr>
                <th>Contact</th>
                <td>: {complaintData[0]?.Farmer[0]?.contact}</td>
              </tr>
              <tr>
                <th>Father Or Husband </th>
                <td>: {complaintData[0]?.Farmer[0]?.fatherOrHusbandName}</td>
              </tr>
              <tr>
                <th>Installation Date </th>
                <td>: {complaintData[0]?.Farmer[0]?.installationDate}</td>
              </tr>
              <tr>
                <th> HP </th>
                <td>: {complaintData[0]?.Farmer[0]?.HP}</td>
              </tr>
              <tr>
                <th>State</th>
                <td>: {complaintData[0]?.Farmer[0]?.state}</td>
              </tr>
              <tr>
                <th>District</th>
                <td>: {complaintData[0]?.Farmer[0]?.district}</td>
              </tr>
              <tr>
                <th> Block </th>
                <td>: {complaintData[0]?.Farmer[0]?.block}</td>
              </tr>
              <tr>
                <th>Gram Panchayat </th>
                <td>: {complaintData[0]?.Farmer[0]?.gram_panchayat}</td>
              </tr>
              <tr>
                <th> Address</th>
                <td>: {complaintData[0]?.Farmer[0]?.address}</td>
              </tr>
              <tr>
                <th>Village</th>
                <td>: {complaintData[0]?.Farmer[0]?.village}</td>
              </tr>
              <tr>
                <th>Pump Type </th>
                <td>: {complaintData[0]?.Farmer[0]?.pump_type}</td>
              </tr>
              <tr>
                <th>AC/DC </th>
                <td>: {complaintData[0]?.Farmer[0]?.AC_DC}</td>
              </tr>
              <tr>
                <th>Department </th>
                <td>: {complaintData[0]?.Farmer[0]?.department}</td>
              </tr>
              <tr>
                <th>Project </th>
                <td>: {complaintData[0]?.Farmer[0]?.project}</td>
              </tr>
              <tr>
                <th>Product </th>
                <td>: {complaintData[0]?.Farmer[0]?.product}</td>
              </tr>
            </table>
          </div>
          <div className='border-2'>
          <table className='text-left'>
              <tr>
                <th>Tracking Id</th>
                <td>: {complaintData[0]?.trackingId}</td>
              </tr>
              <tr>
                <th>Complainant Name </th>
                <td>: {complaintData[0]?.complainantName}</td>
              </tr>
              <tr>
                <th> Contact</th>
                <td>: {complaintData[0]?.contact}</td>
              </tr>
              <tr>
                <th>Authority</th>
                <td>: {complaintData[0]?.authority}</td>
              </tr>
              <tr>
                <th>Priority</th>
                <td>: {complaintData[0]?.priority}</td>
              </tr>
              <tr>
                <th>Company</th>
                <td>: {complaintData[0]?.company}</td>
              </tr>
              <tr>
                <th>Complaint Date</th>
                <td>: {complaintData[0]?.created_At}</td>
              </tr>
            </table>
            <div className='bg-yellow-100 w-full'>
              <h3 className='text-center bg-yellow-300 text-2xl'>C<span className='text-lg'>OMPLAINT</span> D<span className='text-lg'>ETAIL</span></h3>
              <span className='p-2'>{complaintData[0]?.complaintDetails}</span>
            </div>
          </div>
          <div className='border-2'>
            <>
              <div>
                <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">PRIORITY<span className='text-red-500 fixed h-3'>*</span></label>
                <select onChange={(e) => { setPriority(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5 " id="state-select">
                  <option value="">-- select Priority --</option>
                  <option key={1} value="Normal">Normal</option>
                  <option key={1} value="Urgent">Urgent</option>
                  <option key={1} value="Most Urgent">Most Urgent</option>
                </select>
                {/* {priorityError && <span className='text-red-500 text-xs ml-2'>Select Priority</span>} */}
              </div>
              <div>
                <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">STAGE<span className='text-red-500 fixed h-3'>*</span></label>
                <CommonDropdownWithId Api_path={"common/showStage"} value={stage} onChange={handleStageChange} label={"Stage"} />

                {/* {priorityError && <span className='text-red-500 text-xs ml-2'>Select Priority</span>} */}
              </div>
            </>
          </div>
        </div>
      </div>
      </>
  )
}

export default Index
