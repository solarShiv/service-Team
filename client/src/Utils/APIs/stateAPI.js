import axios from "axios";
axios.defaults.withCredentials = true;
export const stateList = async(setStateListData) =>{
    try {
        const stateList = await axios.get(`${process.env.REACT_APP_API_URL}/common/showState`);
        setStateListData(stateList.data.states);
    } catch (error) {
        console.log(error);
    }
}