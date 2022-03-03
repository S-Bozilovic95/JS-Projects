import chatroom from "./chat.js"

let chatroom1 = new chatroom("js","Svetozar2");
let chatroom2 = new chatroom("general","Maja");

console.log(chatroom1);


chatroom1.addChat("Operi kola")
.then(()=>{
        console.log(`Succesfully added chat`);
    })
.catch(err =>{
        console.log(`Could not add chat: ${err}`);
    })