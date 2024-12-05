import axios from "axios";
axios.defaults.withCredentials = true;
export const externalDataFetch = async(API, setListData) => {
    try {
        const listDate = await axios.get(API);
        setListData(listDate.data.data);
        return true;
    } catch (error) {
        return false;
    }
}