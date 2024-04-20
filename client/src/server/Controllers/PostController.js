import PostModel from "../Models/postModel.js";
import mongoose from "mongoose";
import UserModel from "../Models/userModel.js";


//Create new Post

export const createPost = async(req,res)=> {
    const newPost = new PostModel(req.body)

    try {
        await newPost.save()
        res.status(200).json(newPost)
    } catch (error) {
        res.status(500).json(error)
    }
}

//Get a Post
export const getPost =async(req,res)=> {
    const id = req.params.id

    try {
        const post =await PostModel.findById(id)
        res.status(200).json(post)
    }
    catch(error)
    {
        res.status(500).json(error)

    }
}

//update a post
export const updatePost = async(req, res)=> {

    const postId= req.params.id
    const {userId} = req.body

    try {
        const post = await PostModel.findById(postId)
        if(post.userId === userId)
        {
            await post.updateOne( { $set : req.body})
            res.status(200).json("Post Updated")
        }
        else{
            res.status(403).json("Action Forbidden")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

//Delete a post
export const deletePost = async (req, res)=> {
    const id =req.params.id;
    const {userId} = req.body
    try {
        const post = await PostModel.findById(id)
        if(post.userId === userId)
        { 
            await post.deleteOne();
            res.status(200).json("Post Deleted Succesfully")

        }
        else{
            res.status(403).json("Action Forbidden")
        }
    } catch (error) {
        
    }
}

//like and dislike a post

export const likePost =async (req, res)=> {
    const id =req.params.id
    console.log(id)
    const {userId} = req.body

    try {
        const post = await PostModel.findById(id)
        if(!post.likes.includes(userId))
        {
            console.log("HERE")
            await post.updateOne({$push : { likes : userId }})
            res.status(200).json("Post Liked")
        }
        else
        {
            await post.updateOne({$pull : { likes : userId }})
            res.status(200).json("Post Disliked")
        }
    } catch (error) {
        res.status(500).json(error)
        
    }
}

//Get Timeline Posts
export const getTimelinePosts = async (req, res)=> {
    const userId = req.params.id

    try {
        const currentUserPosts =await PostModel.find({userId : userId})
        const followingPosts = await UserModel.aggregate([
            {       $match: {
                _id : new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from : "posts",
                    localField : "following",
                    foreignField : "userId",
                    as : "followingPosts"

                }
            },
            {
            $project:{
                followingPosts: 1,
                _id: 0
            }
        }
        ])
        res.status(200).json(currentUserPosts.concat(...followingPosts.map(user => user.followingPosts)
        .sort((a,b)=>{
            return b.createdAt - a.createdAt;
        })
        ));//this correction is susggested by chatgpt
        //from (.... (onwards))
        //real code  res.status(200).json(currentUserPosts.concat {followingPosts} )
    } catch (error) {
        res.status(500).json(error)
        
    }
}