import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import {showData} from '../../Utils/APIs/commonShowAPI'
import axios from 'axios'
import CommonDropdownWithId from '../../Components/common/commonDropdownWithId'
import { updateData } from '../../Utils/APIs/commonUpdateAPI';
import { externalDataFetch } from '../../Utils/APIs/externalDataFetchAPI';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../Utils/cookies';

const Index = () => {
  const Navigate = useNavigate();
  useEffect(() => {
      const token = getCookie('token');
      if(!token){
        Navigate('/');
      } 
    }, []);
  const location = useLocation();
  const {id} = location.state || {};
  const [complaintData, setComplaintData] = useState({});
  const [stage, setStage] =useState("");
  const [priority, setPriority] = useState("");
  const [fieldSalesList,setFieldSalesList] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState("");
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
        console.log("ESP")
    }, [updateBtnClicked]);

    useEffect(() => {

    }, [])
    const handleStageChange = (stage) =>{
      setStage(stage)
      console.log(stage)
    }
    const updateValue ={
      priority:(priority)? priority : complaintData[0]?.priority,
      stageId:(stage) ? stage : complaintData[0]?.Stage[0]?._id,
      complaintId:id,
      assignEmployee:(selectedEmployee)?selectedEmployee : complaintData[0]?.assignEmployee
    }
    console.log("UV", updateValue)
    useEffect(() => {
      (async function fetchFieldSalesData() {
        try {
          const sendRequest = await axios.get(`http://88.222.214.93:5000/service-team/all-service-persons`);
          console.log("FService",sendRequest.data.data);
          setFieldSalesList(sendRequest.data.data);
        } catch (error) {
          console.error(error);
        }
      })();
    },[]);
    const updateComplaint = (e) =>{
      e.preventDefault();
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
                  <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">PRIORITY<span className='text-red-500 fixed h-3'>*</span></label>
                  <select onChange={(e) => { setPriority(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5 " id="state-select">
                    <option value="">-- select Priority --</option>
                    <option key={1} value="Normal">Normal</option>
                    <option key={1} value="Urgent">Urgent</option>
                    <option key={1} value="Most Urgent">Most Urgent</option>
                  </select>
                  {/* {priorityError && <span className='text-red-500 text-xs ml-2'>Select Priority</span>} */}
                </div>
                <div className='mt-3'>
                  <label for="first_name" class="block mt-3 mb-2 text-sm font-medium text-gray-900 dark:text-white">STAGE<span className='text-red-500 fixed h-3'>*</span></label>
                  <CommonDropdownWithId Api_path={"common/showStage"} value={stage} onChange={handleStageChange} label={"Stage"} />
                  {/* {priorityError && <span className='text-red-500 text-xs ml-2'>Select Priority</span>} */}
                </div>
                <div className='mt-3'>
                  <label for="startDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Field Service<span className='text-red-500 fixed h-3'>*</span></label>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="state-select"
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                  >
                    <option value="">-- Select Field Sales --</option>
                    {fieldSalesList?.map(({ _id, name }) => (
                      <option key={_id} value={_id}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" class="text-dark  mt-6 hover:bg-yellow-400 font-medium rounded-sm text-sm w-full sm:w-auto px-5 py-2.5 text-center firstBgColor">Update</button>
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
