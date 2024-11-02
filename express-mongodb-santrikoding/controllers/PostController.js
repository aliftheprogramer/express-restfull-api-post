//import PrismaClient
const { PrismaClient } = require('@prisma/client');

//init prisma client
const prisma = new PrismaClient();

//import validationResult dari express-validator
const { validationResult } = require('express-validator');

//function findPosts
const findPosts = async (req, res) => {
    try {

        //get all posts from database
        const posts = await prisma.post.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        //send response
        res.status(200).send({
            success: true,
            message: "Get All Posts Successfully",
            data: posts,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};

const createPost = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: "Validation error",
            errors: errors.array(),
        });
    }
    try{
        const post = await prisma.post.create({
            data: {
                title: req.body.title,
                content: req.body.content,
            },
        });

        res.status(201).send({
            success: true,
            message: "Post created successfully",
            data: post,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
}

const findPostById = async (req, res) => {
    const {id} = req.params;

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        //send response
        res.status(200).send({
            success: true,
            message: "Get Post Successfully",
            data: post,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
        
    }
}

const updatePostById = async(req, res)=> {
    const {id}  = req.params; //get id from request params
    const errors = validationResult(req); //get validation result    
    if(!errors.isEmpty()){
        return res.status(422).json({
            success: false,
            message: "Validation error",
            errors: errors.array(),
        });
    }
    try{
        const post = await prisma.post.update({
            where: {
                id: id,
            },
            data: {
                title: req.body.title,
                content: req.body.content,
                updatedAt: new Date(),
            },
        })

        //send response
        res.status(200).send({
            success: true,
            message: "Post updated successfully",
            data: post,
        });

    }catch(error){
        res.status(500).send({
            success: false,
            message: "Internal server error",
            // errors: errors.array(),
        });
    }


}

const deletePostById = async(req, res) => {
    const {id} = req.params;

    try{
            //delete post from database
        await prisma.post.delete({
            where: {
                id: id,
            },
        });

        res.status(200).send({
            success: true,
            message: "Post deleted successfully",
        });


    }catch(error){
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
     

}
//export function
module.exports = {
    findPosts,
    createPost,
    findPostById,
    updatePostById,
    deletePostById
}