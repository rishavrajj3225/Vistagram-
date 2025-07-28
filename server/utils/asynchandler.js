const asyncHandler=(requsthandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requsthandler(req,res,next)).catch(err=>next(err))
    }
}
export {asyncHandler} 