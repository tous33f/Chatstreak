
const asyncHandler=(callback)=>async(req,res,next)=>{
    try{
        await callback(req,res,next)
    }
    catch(err){
        res.render("404",{message: err.message})
    }
}

export {asyncHandler}
