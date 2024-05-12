const express= require ("express");
const app=express();
const mongoose = require('mongoose');
const Listing=require("./models/listing.js");
const path=require("path");
const chat=require("./models/chat.js")

app.set("viwes",path.join(__dirname,"views"));
app.set("viwe engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));

main().then(()=>{console.log(" mongoose connection sucessful");})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.get("/testListing",async(req,res)=>{
  let sampleListing=new Listing({
    title:"my new villa",
    description:"by the beach",
    price:1200,
    location:"goa",
    country:"india",
  });
  await sampleListing.save();
  console.log("sample was saved");
  res.send("successful testing");

});
let chat1=new chat({
  from:"neha",
  to:"priya",
  msg:"send me notes",
  created_at:new Date()
});
chat1.save().then((res)=>{
  console.log(res);
});
//index Route
app.get("/chats", async (req,res)=>{
  let chats= await chat.find();
  console.log(chats);
  res.render("index.ejs",{chats});
});
// new route
app.get("/chats/new",(req,res)=>{
  res.render("new.ejs");
});
//Create route
app.post("/chats",(req,res)=>{
  let{from,to,msg}=req.body;
  let newChat= new chat({
    from:from,
    to:to,
    msg:msg,
    created_at:new Date()
  });
  newChat.save()
  .then((res)=>{
    console.log("chat was saved");
  })
  .catch((err)=>{
    console.log(err);
  })
  res.redirect("/chats");
})
//edit route
app.get("/chats/:id/edit", async (req,res)=>{
  let {id}=req.params;
  let chat=  await chat.findById(id);
  res.render("edit.ejs",{chat});
});
app.get("/",(req,res)=>{
  res.send("root is working");
});

app.listen(8080,()=>{
    console.log("server is connected (:")
})