const complaintAccept = async(req,res) =>{
    try {
        const {accept} = req.query || req.body || req.parmes;     
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Something is wrong please connect with developer"
        })
    }
}

module.exports = {
    complaintAccept
}