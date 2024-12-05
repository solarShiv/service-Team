import axios from 'axios';
axios.defaults.withCredentials = true;
export const checkSaralIdIsExist = async (saralId, setFarmerDetails, setFarmerExist , setResponseMessage) =>{
    console.log("SaralId", saralId)
    try {
        const saralData = await axios.get(`${process.env.REACT_APP_API_URL}/farmer/showFarmer?saralId=${saralId}`);
        console.log("SD",saralData)
        if(saralData.data.success === true){
            setFarmerDetails(saralData.data.response[0]);
            setFarmerExist(true);
        }else {
            setFarmerDetails({});
            setFarmerExist(false)
        }
        setResponseMessage(saralData.data.message);
        // if(saralData.data.response.length > 0){
        //     setFarmerDetails(saralData.data.response[0]);
        //     setFarmerExist(true);
        // }else {
        //     setFarmerDetails({});
        //     setFarmerExist(false)
        // }
    } catch (error) {
        setFarmerDetails({});
        setFarmerExist(false)
        console.log(error)
    }
}