const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const { PostModel } = require("../model/post.model");

const postRouter = express.Router();
postRouter.use(auth)

postRouter.post("/add", async(req, res) => {
    try{
        const newPost = new PostModel(req.body)
        await newPost.save()
        res.status(200).send({"msg": "new post has been added", "newPost": newPost})
    }catch(err){
        res.status(400).send({"error": err})
    }
})

postRouter.get("/", async(req, res) => {
    try{
        const allPosts = await PostModel.find({name: req.body.name})
        res.status(200).send({allPosts})
    }catch(err){
        res.status(400).send({"error": err})
    }
})

postRouter.get("/top", async(req, res) => {
    try{
        const allPosts = await PostModel.find({name: req.body.name})
        res.status(200).send({allPosts})
    }catch(err){
        res.status(400).send({"error": err})
    }
})

postRouter.patch("/update/postId", async(req, res) => {
    const {postId} = req.params;
    const post = await PostModel.findOne({_id: postId})
    try{
        if(req.body.userId === post.userId){
            await PostModel.findByIdAndUpdate({_id: postId}, req.body)
            res.status(200).send({"msg": `post with id: ${postId} has been updated.`})
        }
    }catch(err){
        res.status(400).send({"error": err})
    }
})

postRouter.delete("/delete/postId", async(req, res) => {
    const {postId} = req.params;
    const post = await PostModel.findOne({_id: postId})
    try{
        if(req.body.userId === post.userId){
            await PostModel.findByIdAndDelete({_id: postId})
            res.status(200).send({"msg": `post with id: ${postId} has been deleted.`})
        }
    }catch(err){
        res.status(400).send({"error": err})
    }
})

module.exports = {
    postRouter
}
