export const validateUser = (schema)=>{
  return (req,res,next) =>{
    const {error} = schema.validate(req.body);

    if(error){
      return res.status(400).json({success : false , message : error.datails[0].message  });
    }

    next();
  }
}