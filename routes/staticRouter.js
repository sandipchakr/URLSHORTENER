const express = require('express');
const URL = require('../models/URL');
const User = require('../models/user');
const router = express.Router();

router.get("/", async (req,res)=>{
res.render("home");
});

router.get("/logged", async (req, res) => {
    if(!req.user) return res.redirect("/login");
    const allurls = await URL.find({createdBy: req.user._id});
    const allname = await User.findOne({email:req.user.email});
    return res.render("logged_home", {
        urls: allurls,
        Name: allname.name,
    });
});

router.get("/signup",(req,res)=>{
    return res.render("signup");
});

router.get("/login",(req,res)=>{
    return res.render("login");
});

router.get("/logout",(req,res)=>{
    res.clearCookie("uid");
    return res.redirect("/");
})




module.exports = router;