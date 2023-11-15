import User from '../Model/userModel.js';


const DataSend =  async (req,res )=>{
   
    // Get the authenticated user object
    const user = await User.findById(global.user_id)
    
    try{
        if(!user){
            return res.status(400).json({ success: false, message: 'not found' });
        }

        return res.status(200).json({ success: true, message: 'success ', data:user });
    }catch{
        return res.status(500).json({ success: false, message: 'Error ' });
    }
}
export default DataSend;