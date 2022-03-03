import Chatroom from "./chat.js"
import ChatUI from "./ui.js"

let ul = document.querySelector("ul");
let formSend = document.querySelector("#formMessage");

let chatroom = new Chatroom("js","Svetozar2");
let chatUI = new ChatUI(ul);


formSend.addEventListener("submit",e =>{
    e.preventDefault();

    let message = document.querySelector("#inputMessage");
    
    if(message.value.trim() != 0){
        chatroom.addChat(message.value);
        message.value = "";
    }else{
        alert("Can't send empty message!")
    }
    
})


chatroom.getChats( e =>{
    chatUI.templateLI(e);
})







