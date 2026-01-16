const express = require('express');
const Blog = require("../models/Blog");

const router = express.Router();

router.post("/blogs", async (req, res) =>{
    try{
        const {title, body, author} = req.body;

        if (!title || !body) {
            return res.status(400).json({
                message: "Title and body are required"
            });
        }

        const blog = new Blog({
            title, 
            body, 
            author
        });

        const saveBlog = await blog.save();

        res.status(201).json(saveBlog);
    }catch(error){
        res.status(500).json({
            message: "Failed to create a blog",
            error: error.message
        });
    }
});


router.get("/blogs", async(req, res) => {
    try{
        const blogs = await Blog.find();

        res.status(200).json(blogs);

    }catch(error){
        res.status(500).json({
            message: "Failed to get blogs",
            error: error.message
        });
    }
});

router.get("/blogs/:id", async(req, res) =>{

    try{

        const blog = await Blog.findById(req.params.id);

        if (!blog){
            return res.status(404).json({
                message: "Blog not found"
            });
        }
        res.status(200).json(blog);

    }catch(error){
        res.status(500).json({
            message: "Failed to get id"
        });
    }
    
});

router.put("/blogs/:id", async(req, res) => {
    try{
        const {title, body, author} = req.body;

        if (!title || !body){
            return res.status(404).json({
                message: "Title and body are required"
            });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            {title, body, author},
            {new: true}
        );

        if (!updatedBlog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }
        res.status(200).json(updatedBlog);

    }catch (error){
        res.status(400).json({
            message: "failed to get id" 
        });
    }
});

router.delete("/blogs/:id", async(req, res) =>{
    try{
        const deleteBlog = await Blog.findByIdAndDelete(req.params.id);

        if (!deleteBlog){
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        res.status(200).json({
            message: "Blog deleted successfully"
        });

    }catch(error){
        res.status(400).json({
            message: "Invalid id"
        });
    }
});

module.exports = router