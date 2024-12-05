import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import StageSelect from '../../Components/common/commonDropdownWithId';
import { showData } from '../../Utils/APIs/commonShowAPI';
const Index = () => {
  const [ fieldSalesList, setFieldSalesList ] = useState([]);
  const [ isLoading, setIsLoading] = useState(false);
  const [ selectedStage, setSelectedStage ] = useState('');
  const [ selectedEmployee, setSelectedEmployee ] = useState('');
  const [ startDate, setStartDate ] = useState('');
  const [ endDate, setEndDate ] = useState('');
  const [ complaintFileToDownload, setComplaintFileToDownload ] = useState([]);
  useEffect(() => {
    (async function fetchFieldSalesData(){
      try {
        setIsLoading(true);
        const sendRequest = await axios.get(`http://88.222.214.93:5000/service-team/all-service-persons`);
        console.log(sendRequest.data.allFieldServicePersons);
        setFieldSalesList(sendRequest.data.allFieldServicePersons);
      } catch (error) {
        console.error(error);
      }finally{
        setIsLoading(false);
      }
    })();
  }, []);

  const onClickDownloadExcel = () => {
      showData(`farmer/showComplaint?stage=${selectedStage}&assignEmployee=${selectedEmployee}&startDate=${startDate}&endDate=${endDate}`, setComplaintFileToDownload);
  }
  
  return (
    <div className="grid gap-3 m-6 md:grid-cols-5 items-center">
      <div>
        <label for="Stage_Name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">STAGE<span className='text-red-500 fixed h-3'>*</span></label>
        <StageSelect 
          Api_path={"common/showStage"} 
          value={selectedStage} 
          onChange={(stage) => setSelectedStage(stage)} 
          label={"Stage"} 
        />
      </div>
      <div>
      <div>
      <label for="startDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Field Service<span className='text-red-500 fixed h-3'>*</span></label>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="state-select"
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
        >
          <option value="">-- Select Field Sales --</option>
          {fieldSalesList.map(({_id, name}) =>(
            <option key={_id} value={_id}>
              {name}
            </option>
          ))}
        </select>
    </div>
      </div>
      <div>
        <label for="startDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Date<span className='text-red-500 fixed h-3'>*</span></label>
        <input type="date" id="startDate" onChange={(e) => {setStartDate(e.target.value)}} value={startDate} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5 dark:bg-gray-700 " placeholder="Saral Id" required />
      </div>
      <div>
        <label for="endDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Date<span className='text-red-500 fixed h-3'>*</span></label>
        <input type="date" id="endDate" onChange={(e) => {setEndDate(e.target.value)}} value={endDate} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5 dark:bg-gray-700 " placeholder="Saral Id" required />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Download Excel</label>
        <button onClick={onClickDownloadExcel} type="button" class="bg-gray-50 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600  bg-yellow-300 hover:bg-yellow-500 font-medium rounded-sm text-sm text-gray-800">Download</button>
      </div>
    </div>
    
  )
}

export default Index
