import mongoose from "mongoose";

const userSchema =  new mongoose.Schema(
    {
        name : {type:String,required:true,unique:true},
        email : {type:String,required:true,unique:true},
        password : {type:String,required:true},
        age:{type:Number,required:true},
        gender:{type:String,required:true},
        dob:{type:String,required:true},
        mobileno:{type:String,required:true},
    },
    {
        timestamps:true,
    }
);

const  User = mongoose.model('user',userSchema);

export default User;
