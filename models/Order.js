import mongoose from "mongoose";



//schema
const orderSchema=mongoose.Schema({

name:{
    type:String,
    required:true,
    trim:true,
   
},
user_id:{
    type:String,
    required:true,
    trim:true,
   
},
product_id:{
    type:String,
    required:true,
    trim:true,
   
},
time:{
    type:String,
    required:true,
    trim:true,
   
},
 
amount:{
    type:Number,
    required:true,
    trim:true,
   
},
 
status:{
   type:String,
   default:'place',
   enum: ["place", "ready", "shipped",'posted'],
 
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

export default mongoose.model("Order",orderSchema)