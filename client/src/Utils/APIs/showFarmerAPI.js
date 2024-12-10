import axios from 'axios';

export const showFarmerApi = async( API, setResponseData ) => {
    try {
        const sendRequest = await axios.get(`${process.env.REACT_APP_API_URL}/${API}`);
        console.log(sendRequest.data.response);
        setResponseData(sendRequest.data.response);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}