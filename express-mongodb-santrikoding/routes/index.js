const req = require("express/lib/request");

//import express
const express = require('express')

//init express router
const router = express.Router();

//import PostController
const PostController = require('../controllers/PostController');
//import validatePost as validator
const { validatePost } = require('../utils/validator');

//define route for posts
router.get('/posts', PostController.findPosts);
router.post('/posts', validatePost, PostController.createPost);
router.get('/posts/:id', PostController.findPostById);
router.put('/posts/:id', validatePost, PostController.updatePostById);
router.delete('/posts/:id', PostController.deletePostById);

//export router
module.exports = router