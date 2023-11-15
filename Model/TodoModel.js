import mongoose, { Schema } from 'mongoose';

const TodoSchema = new Schema(
    {
      
     
    
    },
    { strict: false , timestamps:true }
  );
  
  const TodoCollection = mongoose.model('TodoEntries', TodoSchema);
  
  export default TodoCollection;