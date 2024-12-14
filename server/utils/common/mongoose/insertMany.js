const insertMany = async (modelName , data) =>{
    try {
        const insertResponse = await modelName.insertMany(data);
        if(insertResponse) return true;
    } catch (error) {
        console.log("insertMany",error)
        return false;
    }
}
module.exports = insertMany;