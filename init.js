const mongoose = require('mongoose');
const chat=require("./models/chat.js")

main().then(()=>{console.log(" mongoose connection sucessful");})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
let allChats=[
    {
        from:"neha",
        to:"priya",
        msg:"send me notes",
        created_at:new Date()
    },
    {
        from:"anmol",
    to:"sonu",
    msg:"we aree frieds",
    created_at:new Date()
    },
    {
        from:"bona",
    to:"priya",
    msg:"sister brother",
    created_at:new Date()
    },
    {
    from:"bolu",
    to:"shiavni",
    msg:"pta nhi yrr ",
    created_at:new Date()},
];
chat.insertMany(allChats);
  