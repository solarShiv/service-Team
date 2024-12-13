const insertOne = async(modelName,data) =>{
    try {
        const newData = new modelName(
            data
        );
        const savedData = await newData.save();
        return (savedData) ? true : false;
    } catch (error) {
        return false;
    }
}
module.exports = insertOne;