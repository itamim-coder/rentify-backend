import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidation } from '../user/user.validation'
import { UserController } from '../user/user.controller'


const router = express.Router()

router.post(
  '/signup',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
)
// router.post(
//   '/login',
//   validateRequest(AuthValidation.loginZodSchema),
//   AuthController.loginUser
// )
// router.post(
//   '/refresh-token',
//   validateRequest(AuthValidation.refreshTokenZodSchema),
//   AuthController.refreshToken
// )

export const AuthRoutes = router