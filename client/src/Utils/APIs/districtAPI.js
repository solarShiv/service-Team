import axios from "axios";
axios.defaults.withCredentials = true;
export const districtListApi = async( stateId, setDistrictListData) =>{
    try {
        const districtList = await axios.get(`${process.env.REACT_APP_API_URL}/common/showDistrict?stateId=${stateId}`);
        setDistrictListData(districtList.data.districts[0].district);
    } catch (error) {
        console.log(error);
    }
}