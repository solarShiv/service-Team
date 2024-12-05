const insertOne = async(modelName,data) =>{

    try {
        const newData = new modelName(
            data
        );
        const savedData = await newData.save();
        return (savedData) ? true : false;
    } catch (error) {
        console.log("insertOne", error)
        return false;
    }
}
module.exports = insertOne;