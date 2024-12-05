import axios from "axios";
axios.defaults.withCredentials = true;
export const departmentListApi = async( stateId, setDepartmentListData) =>{
    try {
        const departmentList = await axios.get(`${process.env.REACT_APP_API_URL}/common/showDepartment?stateId=${stateId}`);
        setDepartmentListData(departmentList.data.data);
    } catch (error) {
        console.log(error);
    }
}