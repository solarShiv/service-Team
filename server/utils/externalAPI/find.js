const axios = require("axios");

const find = async(API) =>{
    try {
        const responseData = await axios.get(API);
        return responseData;
    } catch (error) {
        return false;
    }
};
module.exports = find;