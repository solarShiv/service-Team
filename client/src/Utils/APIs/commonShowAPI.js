import axios from "axios";
axios.defaults.withCredentials = true;
export const showData = async(API, setStateListData) => {
    try {
        const listDate = await axios.get(`${process.env.REACT_APP_API_URL}/${API}`);
        console.log("ls",listDate.data.data);
        setStateListData(listDate.data.data);
    } catch (error) {
        console.log(error);
    }
}