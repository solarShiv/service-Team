import axios from "axios";
axios.defaults.withCredentials = true;
export const insertData = async(path, setResponse, data) =>{
    try {
        const listDate = await axios.post(`${process.env.REACT_APP_API_URL}/${path}`, data);
        console.log(listDate.data)
        setResponse(listDate.data.message);
    } catch (error) {
        console.log(error);
    }
}