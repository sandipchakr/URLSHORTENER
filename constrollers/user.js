const User = require("../models/user");
const {v4: uuidv4} = require('uuid'); // this is for generate a unique id for user , it downlode using npm i uuid( but now we use jwt where this uuid is not use farther)
const {setUser}= require('../service/auth');

async function handleUserSignup(req,res){
const {name,email,password}= req.body;
await User.create({
    name,
    email,
    password,
});

return res.redirect("/login");

}

async function handleUserLogin(req,res){
const {email,password}= req.body;
const user=await User.findOne({email,password});
if(!user) return res.render("login",{
    error: "Invalid Username or Password",
});

const token = setUser(user);
res.cookie("uid",token);
return res.redirect("/logged");

}
module.exports = {
    handleUserSignup,
    handleUserLogin,
}