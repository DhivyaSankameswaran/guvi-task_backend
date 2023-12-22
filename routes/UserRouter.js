import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../model/User.js';
// import bcrypt from 'bcryptjs';
// import { generatetoken } from '../utils.js';
const UserRouter = express.Router();

UserRouter.post('/create',
    expressAsyncHandler(async(req,res)=>{
        console.log('enterd');
        const AddUser = new User(
            {
                email : req.body.value.email,
                name:req.body.value.name,
                password : req.body.value.password,
                age:"",
                gender:"",
                dob:"",
                mobileno:"",
                // confirmpassword:req.body.value.confirmPassword
            }
        );
        console.log(req)
        const Add = await AddUser.save();
        res.send({
            email : Add.email,
            name:Add.name,
            password : Add.password,
            age:"",
            gender:"",
            dob:"",
            mobileno:"",
            // confirmpassword:Add.confirmPassword
        });
    })
);
UserRouter.post(
    '/signin',
    expressAsyncHandler(async (req,res)=>{
        console.log(req.body)
        const user = await User.findOne({ email:req.body.email});
        if(user) {
                if(req.body.password === user.password) {
                    res.send({
                        email : user.email,
                    });
                    return ;
                }
        }
        res.status(401).send({message:'Invalid email or password'});
    })
);
UserRouter.put(
    "/update/profile/:email", // Use email as the identifier (adapt as needed)
    expressAsyncHandler(async (req, res) => {
      const param_email = req.params.email;
      console.log(param_email);
      console.log("Received data:", req.body);
      try {
        const user = await User.findOne({ email: param_email });
  
        if (user) {
          // console.log(user)
          const updatedProfile = await User.findOneAndUpdate(
            { email: param_email },
            { $set: req.body.ReqData }
          );
          if (updatedProfile) {
            return res.status(200).send({ message: "Success" });
          }
        }
  
        // if (!updatedProfile) {
        //   return res.status(404).send({ message: 'Profile not found' });
        // }
  
        res.send(updatedProfile);
      } catch (error) {
        res.status(500).send({ message: "Internal server error" });
      }
    })
  );
  
export default UserRouter;