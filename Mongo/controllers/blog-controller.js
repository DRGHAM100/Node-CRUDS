import mongoose from 'mongoose';
import Blog from '../models/Blog';
import User from '../models/User';


const getAllBlogs = async (req,res) => {
    let blogs;

    try {
        blogs = await Blog.find({});

        res.status(200).json({blogs});
    } catch (error) {
        console.log(error);
    }

}

const addBlog = async(req,res) => {
    const {title,description,image,user} = req.body; 
    let existingUser;

    try {
        existingUser = await User.findById(user);
    } catch (error) {
        console.log(error);
    }

    if(!existingUser)
        return res.status(404).json({msg: "No User"});

    const blog = new Blog({title,description,image,user});

    try {
        // const session = await mongoose.startSession();
        // session.startTransaction();
            // await blog.save({session});
            await blog.save();
            existingUser.blogs.push(blog);
            // await existingUser.save({session});
            await existingUser.save();
        // await session.commitTransaction();
     } catch (error) {
        return console.log(error);
     }

     return res.status(201).json({blog});
    
}

const updateBlog = async(req,res) => {
    const {title,description,image,user} = req.body; 
    const id = req.params.id;
    let blog;

    try {
        blog = await Blog.findByIdAndUpdate(id,{
            title,
            description,
            image,
            user,
        });
     } catch (error) {
        return console.log(error);
     }

     if(!blog)
        return res.status(200).json({msg: "No Blog"}); 

     return res.status(200).json({blog}); 
}


const getBlog = async (req,res) => {
    let blog;

    try {
        blog = await Blog.findById(req.params.id);

        res.status(200).json({blog});
    } catch (error) {
        console.log(error);
    }

}

const deleteBlog = async (req,res) => {
    let blog;

    try {
        blog = await Blog.findByIdAndDelete(req.params.id).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        res.status(200).json({blog});
    } catch (error) {
        console.log(error);
    }

}

const getByUserId = async (req,res) => {
    let userBlogs;

    try {
        userBlogs = await User.findById(req.params.id).populate('blogs');

        res.status(200).json({userBlogs});
    } catch (error) {
        console.log(error);
    }

}



export default {getAllBlogs,addBlog,updateBlog,getBlog,deleteBlog,getByUserId}