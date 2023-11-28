import mongoose from "mongoose";



//schema
const tagSchema=mongoose.Schema({

name:{
    type:String,
    required:true,
    trim:true,
    unique:true 
},
slug:{
    type:String,
    required:true,
    trim:true,
    unique:true
},
 
status:{
   type:Boolean,
   default:true
 
},
trash:{
   type:String, 
   default:false
}

},
{
    timestamps:true 
})


 


///exprot model 

export default mongoose.model("MyTag",tagSchema)