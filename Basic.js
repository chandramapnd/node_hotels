let os=require('os');
let fs=require('fs');

let notes=require("./Notes.js")
let user=os.userInfo();
console.log(user.username);

fs.writeFile("user.txt","hi "+user.username,()=>console.log("File is running"))

console.log(notes.add)


