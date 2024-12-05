import axios from "axios";
axios.defaults.withCredentials = true;
export const updateData = async(path, setResponse, data) =>{
    try {
        const listDate = await axios.put(`${process.env.REACT_APP_API_URL}/${path}`, data);
        console.log(listDate.data)
        setResponse(listDate.data.message);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}