import bcrypt from "bcryptjs";
import httpStatus from "http-status";
import UserModel from "../models/users.model";


// register
const registerController = async (req,res) =>{
    const {name, username, password} = req.body;

    try {
        // check for existing user
        const existingUser = UserModel.findOne({username});
        if(existingUser){
            return res.status(httpStatus.FOUND).json({message: "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new UserModel.create({
            name: name,
            username: username,
            password: hashedPassword
        })
        await newUser.save();
        res.status(httpStatus.CREATED).json({message: "User created successfully"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error"});
        
    }
}

