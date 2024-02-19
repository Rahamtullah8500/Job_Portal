import { User } from "../models/user";
import { catchAsyncError } from "./catchAsyncError";
import HandleError from "./error";
import jwt from 'jsonwebtoken'

export const isAuthorized = catchAsyncError( async (req, res, next)=>{
    const {token} = req.cookies;
    if(!token){
        next(new HandleError('not authorized',400))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    req.user = await User.findById(decoded.id);

    next()
})