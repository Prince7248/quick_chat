const router = require('express').Router();
const User =require('./../models/user');
const authMiddlerware  = require('./../middlerware.js/authMiddlerware');


router.get('/get-logged-user', authMiddlerware, async(req, res) =>{
    try{
        const user = await User.findOne({_id: req.body.userId});
        res.send({
            message: 'user fetched successfully!',
            success: true,
            data: user
        });

    }catch(error){
        res.status(400).send({
            message: error.message,
            success:false
        });
    }
});


router.get('/get-all-users', authMiddlerware, async(req, res) =>{
    try{
        const userid = req.body.userId;
        const allUsers = await User.find({ _id: { $ne: userid } });
        res.send({
            message: ' all users fetched successfully!',
            success: true,
            data: allUsers 
        });

    }catch(error){
        res.status(400).send({
            message: error.message,
            success:false
        });
    }
});
module.exports = router;