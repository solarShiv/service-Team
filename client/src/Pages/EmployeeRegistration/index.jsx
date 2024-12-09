import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { employeeRegisterApi } from '../../Utils/APIs/employeeRegisterAPI';
import { showData } from '../../Utils/APIs/commonShowAPI';


const Index = () => {
    const [employeeData, setEmployeeData] = useState({});
    const [ roleList, setRoleList ] = useState([]);
    const [ error, setError ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData((prev) => ({ ...prev, [name]: value }))
    }

    useEffect(() => {
        showData('auth/showRole', setRoleList);
    }, [])

    const handleEmployeeRegisterForm = (e) => {
        e.preventDefault();
        console.log(employeeData);
        employeeRegisterApi( setIsLoading, employeeData).then((status) => {
            if(status){
                setError({status: true, msg: 'Employee Registered Successfully'});
            }
            else{
                setError({status: false, msg: 'Something went Wrong'});
            }
        })
        console.log('form Submitted Succesfully');
    }
    return (
        <div className="w-auto flex flex-col">
            <div className="mainHeading">
                <h1 className='text-3xl font-semibold tracking-widest text-center p-2 bg-gray-50  rounded-lg'>E<span className='text-lg'>MPLOYEE</span> R<span className='text-lg'>EGISTRATION</span></h1>
            </div>
            <div className="formField">
                <form onSubmit={handleEmployeeRegisterForm}>
                    <div className="grid gap-3 m-6 md:grid-cols-4">
                        <div>
                        <label htmlFor="empID" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Department<span className='text-red-500 fixed h-3'>*</span></label>
                            <select
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                id="state-select"
                                name='department'
                                value={employeeData?.department}
                                onChange={handleOnChange}
                            >
                                <option value="">-- Select Department --</option>
                                {roleList.map(({_id, role}) => (
                                    <option key={_id} value={role}>
                                        {role}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="empID" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Employee ID<span className='text-red-500 fixed h-3'>*</span></label>
                            <input type="text" id="empId" name='empId' onChange={handleOnChange} value={employeeData?.empId} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5 dark:bg-gray-700 " placeholder="Employee Id" required />
                        </div>
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name<span className='text-red-500 fixed h-3'>*</span></label>
                            <input type="text" id="name" name='name' onChange={handleOnChange} value={employeeData?.name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5 dark:bg-gray-700 " placeholder="Employee Name" required />
                        </div>
                        <div>
                            <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile<span className='text-red-500 fixed h-3'>*</span></label>
                            <input type="number" id="mobile" name='mobile' onChange={handleOnChange} value={employeeData?.mobile} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5 dark:bg-gray-700 " placeholder="Employee Mobile" required />
                        </div>
                        <div>
                            <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password<span className='text-red-500 fixed h-3'>*</span></label>
                            <input type="password" id="password" name='password' onChange={handleOnChange} value={employeeData?.password} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5 dark:bg-gray-700 " placeholder="Password" required />
                        </div>
                       
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 24 }}>
                        <button type="submit" className="text-dark bg-yellow-500 ml-6 hover:bg-yellow-400 font-medium rounded-sm text-sm w-full sm:w-auto px-5 py-2.5 text-center">Register</button>
                        {
                            error && <span style={{ color: error.status ? 'green' : 'red'}}>{ error.msg}</span>
                        }
                    </div>
                    
                </form>
            </div>
        </div>
    )
}

export default Index;