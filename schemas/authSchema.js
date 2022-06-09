import joi from "joi"

export const authSignInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
})

export const authSignUpSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  confirmPassword: joi.string().required(),
})