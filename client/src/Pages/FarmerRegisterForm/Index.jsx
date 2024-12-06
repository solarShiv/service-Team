import React,{useEffect, useState} from 'react'
import StateSelect from '../../Components/common/stateList.js'
import DistrictSelect from '../../Components/common/districtList.js';
import { districtListApi } from '../../Utils/APIs/districtAPI.js';
import { departmentListApi }  from '../../Utils/APIs/departmentAPI.js';
import { ProductListAPI } from '../../Utils/APIs/productListAPI.js'
import DepartmentSelect from '../../Components/common/departmentList.js';
import ProductSelect from '../../Components/common/productList.js'; 

const Index = () => {
    const [saralId, setSaralId] = useState("");
    const [farmer, setFarmer] = useState("");
    const [father,setFather] = useState("");
    const [Contact, setContact] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [district, setDistrict] = useState("");
    const [districtList, setDistrictList ] = useState([]);
    const handleStateChange = (stateId) => {
        setSelectedState(stateId);
      };
    const handleDistrictChange = (district) =>{
        setDistrict(district);
    }
    useEffect(() =>{
        if(selectedState !== "") districtListApi(selectedState, setDistrictList);
    },[selectedState]);

    const [departmentList, setDepartmentList] = useState([]);
    const [department, setDepartment] = useState();
    const [departmentId , setDepartmentId] = useState("");

    const handleDepartmentChange = (department) => {
        const breakDepartment = department.split("-");
        setDepartmentId(breakDepartment[1]);
        setDepartment( breakDepartment[0]);
    }
    useEffect(() =>{
        if(selectedState !== "") departmentListApi(selectedState, setDepartmentList);
    },[selectedState]);

    const [productList, setProductList] = useState([]);
    const [product,setProduct] = useState("");
    const [productId, setProductId] = useState("");
    
    const handleProductChange = (product) =>{
        const breakProduct = product.split("%");
        setProductId(breakProduct[1])
        setProduct(breakProduct[0])
    }
    useEffect(()=>{
        if(departmentId !== "") ProductListAPI(departmentId, setProductList);
    },[departmentId]);
    const [project, setProject] = useState("");
    const [block, setBlock] = useState("");
    const [gramPanchayat, setGramPanchayat] = useState("");
    const [village, setVillage] = useState("");
    const [pin, setPin] = useState("");
    const [address, setAddress] = useState("");
    const [installationDate, setInstallationDate] = useState("");
    const farmerRegister = (e) =>{
        e.preventDefault();
        
    }
  return (
    <>
      <div className="w-auto flex flex-col">
        <div className="mainHeading">
            <h1 className='text-3xl font-semibold tracking-widest text-center p-2 bg-gray-50  rounded-lg'>F<span className='text-lg'>ARMER</span> R<span className='text-lg'>EGISTRATION</span></h1>
        </div>
              <div className="formField">
                  <form onSubmit={farmerRegister}>
                      <div className="grid gap-3 m-6 md:grid-cols-4">
                          <div>
                              <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Saral ID<span className='text-red-500 fixed h-3'>*</span></label>
                              <input type="text" id="first_name" onChange={(e)=>{setSaralId(e.target.value)}} value={saralId} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5 dark:bg-gray-700 " placeholder="Saral Id" required />
                          </div>
                          <div>
                              <label for="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Farmer name<span className='text-red-500 fixed h-3'>*</span></label>
                              <input type="text" id="last_name" onChange={(e)=>{setFarmer(e.target.value)}} value={farmer} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Farmer name" required />
                          </div>
                          <div>
                              <label for="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Father name<span className='text-red-500 fixed h-3'>*</span></label>
                              <input type="text" id="company" onChange={(e)=>{setFather(e.target.value)}} value={father} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Father name" required />
                          </div>
                          <div>
                              <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact number<span className='text-red-500 fixed h-3'>*</span></label>
                              <input type="tel" id="phone" onChange={(e)=>{setContact(e.target.value)}} value={Contact} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                          </div>
                          <div>
                              <label for="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State<span className='text-red-500 fixed h-3'>*</span></label>
                              <StateSelect value={selectedState} onChange={handleStateChange} />
                          </div>
                          <div>
                              <label for="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">District<span className='text-red-500 fixed h-3'>*</span></label>
                              <DistrictSelect  districtListData={districtList} value={district} onChange={handleDistrictChange} />
                          </div>
                          <div>
                              <label for="department" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department<span className='text-red-500 fixed h-3'>*</span></label>
                              <DepartmentSelect  departmentListData={departmentList} value={department} onChange={handleDepartmentChange} />
                          </div>
                          <div>
                              <label for="department" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product<span className='text-red-500 fixed h-3'>*</span></label>
                              <ProductSelect  productListData={productList} value={product} onChange={handleProductChange} />
                          </div>
                          <div>
                              <label for="department" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project<span className='text-red-500 fixed h-3'>*</span></label>
                              {/* <ProjectSelect  departmentListData={departmentList} value={department} onChange={handleDepartmentChange} /> */}
                          </div>
                          <div>
                              <label for="block" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Block<span className='text-red-500 fixed h-3'>*</span></label>
                              <input type="text" id="block" onChange={(e)=>{setBlock(e.target.value)}} value={block} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Black" required />
                          </div>
                          <div>
                              <label for="gram" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gram Panchayat</label>
                              <input type="text" id="gram" onChange={(e)=>{setGramPanchayat(e.target.value)}} value={gramPanchayat} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Gram Panchayat" required />
                          </div>
                          <div>
                              <label for="village" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Village</label>
                              <input type="text" id="village" onChange={(e)=>{setVillage(e.target.value)}} value={village} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Village" required />
                          </div>
                          <div>
                              <label for="pinCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pin Code<span className='text-red-500 fixed h-3'>*</span></label>
                              <input type="number" id="pinCode" onChange={(e)=>{setPin(e.target.value)}} value={pin} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123456" pattern="[0-9]{6}" required />
                          </div>
                          <div>
                              <label for="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                              <input type="text" id="address" onChange={(e)=>{setAddress(e.target.value)}} value={address} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address" required />
                          </div>
                          <div>
                              <label for="InstallationDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Installation Date</label>
                              <input type="date" id="InstallationDate" onChange={(e)=>{setInstallationDate(e.target.value)}} value={installationDate} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                          </div>
                      </div>
                      <button type="submit" className="text-dark bg-yellow-500 ml-6 hover:bg-yellow-400 font-medium rounded-sm text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
                  </form>
              </div>
      </div>

    </>
  )
}

export default Index
