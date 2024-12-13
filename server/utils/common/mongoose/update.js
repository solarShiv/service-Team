const update = async(modelName, id, data) =>{
    try {
        const updateResponse = await modelName.findByIdAndUpdate(id,data,{new:true});
        return (updateResponse) ? true : false;
    } catch (error) {
        return false;
    }
}
module.exports = update;