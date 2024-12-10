import axios from 'axios';

export const employeeRegisterApi = async( setLoading, employeeRegistrationData ) => {
    setLoading(true);
    try {
        const sendRequest = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, employeeRegistrationData , {
            headers: {
                "Content-Type": 'application/json'
            }
        });
        console.log(sendRequest.data);
        return true;
    } catch (error) {
        if(error.code === 'ECONNABORTED'){
            console.log('Session Time out');
        }
        
        if(error.response){
            console.log(error.response.data);
        }
        else if(error.request){
            console.log('something went wrong');
        }
        else{
            console.log('Try again later');
        }
        return false;
    }finally{
        setLoading(false);
    }
}