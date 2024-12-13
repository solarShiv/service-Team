const find = async(modelNames, filters, select) =>{
    try {
        const responseData = await modelNames.find(filters).select(select).lean();
        return responseData;
    } catch (error) {
        console.log(error)
        return false;
    }
}
module.exports = find;