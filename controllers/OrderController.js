
import Order from '../models/Order.js'



export const CreateOrder=async(req,res,next)=>{



try {
    
 const order=await Order.create(req.body)


res.json(order)

} catch (error) {
    
 next(error)


}







}


// get all orders 

export const Getallorders=async(req,res,next)=>{



try {
    
 const order=await Order.find()


res.json(order)

} catch (error) {
    
 next(error)


}





}

// get all orders 

export const Editeorder=async(req,res,next)=>{

const {status}=req.body
// const {status}=req.params
console.log(req.body.status);

try {
    
 const order=await Order.findByIdAndUpdate(req.params.id,{status},{new: true})


res.json(order)

} catch (error) {
    
 next(error)


}





}