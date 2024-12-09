import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeCookie, setCookie } from '../Utils/cookies';
import axios from 'axios';
// Create a context

axios.defaults.withCredentials = true;
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [empData, setEmpData] = useState();
    const Navigate = useNavigate();
    const loginAPI = async(loginData , setError, setLoading) =>{
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, loginData);
            console.log(response.data);
            if(response.data.success){
              const { token } = response.data;
              setCookie('token', token, {expires: 0.5, secure: false });
              setCookie('empData', JSON.stringify(response.data.data));
              setEmpData(response.data.data);
              Navigate('/dashboard');
            }
            return true;
          } catch (error) {
            console.log("login error",error)
            if (error.response) {
              setError(error.response.data.message || "Login failed. Please try again.");
            } else {
              setError(error);
            }
            return false;
          } finally {
            setLoading(false);
          }
      
    }
    const logoutAPI = async(setError) => {
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/logout`);
            console.log(response.data.success);
            removeCookie('token');
            removeCookie('empData');
            Navigate('/');
            return true;
        }catch(error){
          console.log(error);
            if (error.response) {
                setError(error.response.data.message || "Login failed. Please try again.");
              } else {
                setError("An error occurred. Please try again later.");
              }
              return false;
        }

    }
    return (
        <AuthContext.Provider  value={{logoutAPI, loginAPI, empData, setEmpData}}>
            {children}
        </AuthContext.Provider>
    )
} 
