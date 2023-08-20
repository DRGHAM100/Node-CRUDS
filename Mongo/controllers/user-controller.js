import User from '../models/User';
import bcrypt from 'bcryptjs';

const getUsers = async (req,res) => {
    let users;

    try {
        users = await User.find({});

        res.status(200).json({users});
    } catch (error) {
        console.log(error);
    }

}

const signUp = async (req,res) => {
    const {name,email,password} = req.body;
    let existingUser;

    try {
       existingUser = await User.findOne({email});
    } catch (error) {
        return console.log(error);
    }

    if(existingUser){
        return res.status(400).json({msg: "User Already Exists"});
    }

    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({name,email,password: hashedPassword,blogs: []});
    
    try {
        await user.save();
     } catch (error) {
        return console.log(error);
     }
    
     return res.status(201).json({user});
}

const login = async (req,res) => {
    const {email,password} = req.body;
    let existingUser;

    try {
        existingUser = await User.findOne({email});
     } catch (error) {
         return console.log(error);
     }
 
    if(!existingUser){
         return res.status(400).json({msg: "No User With This Email"});
     }

    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password);

    if(!isPasswordCorrect){
        return res.status(400).json({msg: "Wrong Password"});
    }


    res.status(200).json({user: existingUser});
}

export default {getUsers,signUp,login}