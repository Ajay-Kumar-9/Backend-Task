import Joi from 'joi';

export const userSchema = Joi.object({
    name : Joi.string().required(),
    email : Joi.string().email().required(),
    password : Joi.string().min(4).max(100).required(),
    role:Joi.string().valid("admin" , "user").required()
});


