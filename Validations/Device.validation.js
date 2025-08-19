import Joi from 'joi';

export const RegisterDeviceSchema = Joi.object({
    name : Joi.string().required().min(2).max(50),
    type :Joi.string().required(),
    status : Joi.string().optional()
})