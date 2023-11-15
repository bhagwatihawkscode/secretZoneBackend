import TodoCollection from "../Model/TodoModel.js"


const EditData =  async (req,res )=>{
    let data = req.body
   
    let id = data.key  
    // Get the authenticated user object
     try {
       const data = await  TodoCollection.findById( id )
       if (!data) {
        return res.status(404).json({ message: 'No data objects found' });
      }
      return res.status(201).json(data);
    }catch{
        return res.status(500).json({ message: 'internal error ' });
    }
}
export default EditData;