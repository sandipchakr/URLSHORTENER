require("dotenv").config();

const express = require('express');
const path = require('path'); // for view___________________>
const cookieParser = require('cookie-parser');
const {connectToMongoDB} = require("./connection");
const {restrictToLoggedinUserOnly,checkAuth} = require('./middleware/auth');

//import routers:;-
const urlRoute = require('./routes/url');
const staticRouter = require('./routes/staticRouter');
const userRoute = require('./routes/user');

const app = express();
const PORT = process.env.PORT;
const URL = require('./models/URL');


app.set("view engine","ejs");
app.set("views",path.resolve("./views"));  //--------------------------->for view

//for CSS and image files:-
app.use(express.static("public"));

//midldleware for parsing the incomeing body :-
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

//connecting to mongodb:-
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected....")); // for deployment


//Routing:-


app.use("/url",restrictToLoggedinUserOnly,urlRoute);
app.use("/user",userRoute);
app.use("/",checkAuth,staticRouter);

app.get("/url/:shortId",async(req,res)=>{
const shortId = req.params.shortId;
const entry = await URL.findOneAndUpdate({
    shortId
},{$push:{
   visitHistory:{
    timestamp: Date.now(),
   }
},
});
res.redirect(entry.redirectURL);
});




app.listen(PORT,()=>console.log(`Server Started at PORT: ${PORT}`));