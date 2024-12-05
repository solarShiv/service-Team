import axios from "axios";
axios.defaults.withCredentials = true;
export const ProductListAPI = async( departmentId, setProductListData) =>{
    try {
        const productList = await axios.get(`${process.env.REACT_APP_API_URL}/common/showProduct?departmentId=${departmentId}`);
        setProductListData(productList.data.products);
    } catch (error) {
        console.log(error);
    }
}