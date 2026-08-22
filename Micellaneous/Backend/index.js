const express=require("express");
const app=express();
const port=8080;


app.listen(port,()=>{
    console.log("Listening to port:",port)
})
app.get("/register",(req,res)=>{
    let {user,password}=req.query;
    res.send(`Standard GET response Welcome ${user}!`);
})
app.post("/register",(req,res)=>{
    res.send("Standard POST response");
})//In post request we have body , we dont observe that body in url but this recieved at the backend of server.
//Let try with forms.
//How to get body in post requests.
