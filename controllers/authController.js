const router = require('express').Router();
const User = require('./../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup', async(req, res) => {
    try{
        //if the user is already exists
        const user  = await User.findOne({email: req.body.email});


        // if the user is already exists
        if(user){
            return res.send({
                message: 'User already exists.',
                success: false
            });
        }
        //encrypt the password

        const hashedPassword = await bcrypt.hash(req.body.password,10);
        req.body.password = hashedPassword;

        //create new user, save in db
        const newUser = new User(req.body);
        await newUser.save();

        res.send({
            message: 'User created successfully!',
            success: true
        });

    }catch(error){
        res.send({
            message:error.message,
            success:false
        });

    }
   
 })

router.post('/login',async(req,res) =>{
    try{
        //1 check if user exists
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return res.send({
                message:'User does not exist',
                success:false

            })
        }

        //2 check if the password is correct 
        const isvalid = await bcrypt.compare(req.body.password, user.password);
        if(!isvalid){
            return res.send({
                message: 'User does not exist',
                success:false

            })
        }

        // if the user exists & password is correct assign a JWT
    

        const token =  jwt.sign({userId: user_id},process.env.SECRET_KEY, {expiresIn: "Id"});
         
        res.send({
            message: 'User logged-in sucessfully',
            success : true,
            token: token
        });


    }catch(error){
        res.send({
            message:error.message,
            success:false
        })
    }
});

module.exports = router;