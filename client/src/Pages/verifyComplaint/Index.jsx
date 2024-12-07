import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import {showData} from '../../Utils/APIs/commonShowAPI'
import axios from 'axios'
import CommonDropdownWithId from '../../Components/common/commonDropdownWithId'
import { updateData } from '../../Utils/APIs/commonUpdateAPI';
import { externalDataFetch } from '../../Utils/APIs/externalDataFetchAPI';


const Index = () => {
  const location = useLocation();
  const {id} = location.state || {};
  const [complaintData, setComplaintData] = useState({});
  const [verify, setVerify] = useState("");
  const [callingVerifyRemark ,setCallingVerifyRemark] = useState("");
  const [updateResponse, setUpdateResponse] = useState("");
  const [externalServicePerson, setExternalServicePerson] = useState([]);
  const [ updateBtnClicked, setUpdateBtnClicked ] = useState(false);
    useEffect(() => {
        showData(`farmer/showComplaint?complaintId=${id}`,setComplaintData).then((status) => {
          if(status){
            console.log(status);
            externalDataFetch(`http://88.222.214.93:5000/service-team/find-service-person?id=${status[0].assignEmployee}`,setExternalServicePerson);
            setUpdateBtnClicked(false);
            console.log("jkdfhjikhk",externalServicePerson)
          }
        });
    }, [updateBtnClicked]);
    const updateValue ={
      verify,
      callingVerifyRemark
    }
    const updateComplaint = (e) =>{
      e.preventDefault();
      // continue work 
      updateData("service/updateComplaint", setUpdateResponse,updateValue).then((status) => {
        if(status){
          setUpdateBtnClicked(true);
        }
      });
    }
  return (
    <>
      <div className=" flex flex-col">
        <div>
          <h1 className=' text-3xl font-semibold tracking-widest text-center p-2 bg-gray-900 text-gray-100'>C<span className='text-lg'>OMPLAINT</span> D<span className='text-lg'>ETAILS</span></h1>
        </div>
        <div className="flex flex-row justify-around bg-gray-200 ">
          <h1 className=' text-2xl font-semibold  tracking-widest p-2'>F<span className='text-lg'>armer</span> N<span className='text-lg'>ame - {complaintData[0]?.Farmer[0]?.farmerName}</span></h1>
          <h1 className=' text-2xl font-semibold  tracking-widest p-2'>S<span className='text-lg'>aral</span> I<span className='text-lg'>d - {complaintData[0]?.Farmer[0]?.saralId}</span></h1>
        </div>
        <div className=" flex flex-row justify-around p-1">
          <div className='mt-3'>
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
          <div className='mt-3'>
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
                <td className={(complaintData[0]?.priority === 'Most Urgent')?'text-red-800':''}>: {complaintData[0]?.priority}</td>
              </tr>
              <tr>
                <th>Company</th>
                <td>: {complaintData[0]?.company}</td>
              </tr>
              <tr>
                <th>Stage</th>
                <td>: {complaintData[0]?.Stage[0]?.stage}</td>
              </tr>
              <tr>
                <th>Assign Employee</th>
                <td>: {externalServicePerson.name}</td>
              </tr>
              <tr>
                <th>Complaint Date</th>
                <td>: {complaintData[0]?.created_At}</td>
              </tr>
            </table>
            <div className='bg-gray-200'>
              <h3 className='text-center bg-yellow-300 text-2xl'>C<span className='text-lg'>OMPLAINT</span> D<span className='text-lg'>ETAIL</span></h3>
              <span className='p-2'>{complaintData[0]?.complaintDetails}</span>
            </div>
          </div>
          <div className='w-2/12'>
            <form onSubmit={updateComplaint}>
              <>
                <div className='mt-3'>
                  <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Farmer Certified<span className='text-red-500 fixed h-3'>*</span></label>
                  <select onChange={(e) => { setVerify(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5 " id="state-select">
                    <option value="">-- select Priority --</option>
                    <option key={1} value="Yes">Yes</option>
                    <option key={1} value="No">No</option>
                  </select>
                  {/* {priorityError && <span className='text-red-500 text-xs ml-2'>Select Priority</span>} */}
                </div>
                <div>
                  <label for="message" className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">Remark</label>
                  <textarea id="message" onChange={(e) => { setCallingVerifyRemark(e.target.value) }} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 " placeholder="Write your thoughts here..."></textarea>
                </div>
                <button type="submit" className="text-dark  mt-6 hover:bg-yellow-400 font-medium rounded-sm text-sm w-full sm:w-auto px-5 py-2.5 text-center firstBgColor">Save</button>
              </>
            </form>
            {updateResponse}
          </div>
        </div>
      </div>
      </>
  )
}

export default Index