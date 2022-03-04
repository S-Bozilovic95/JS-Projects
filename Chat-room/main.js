import Chatroom from "./chat.js"
import ChatUI from "./ui.js"

// reference
let ul = document.querySelector("ul");
let formSend = document.querySelector("#formMessage");
let formUsername = document.querySelector("#formUsername");

// klase
let chatroom = new Chatroom(checkLocal(localStorage.room,"general"),checkLocal(localStorage.username,"anonymus"));
let chatUI = new ChatUI(ul);

// funkcije

// dodavanje poruke
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


// update imena
formUsername.addEventListener("submit",e =>{
    e.preventDefault();

    let newName = document.querySelector("#inputUsername");
    let p = document.querySelector("#screen p");
    let report = null;
    let br = 0;

    if(newName.value.trim() != 0 && newName.value.length<=10 && newName.value.length>=2){
        chatroom.updateUsername(newName.value);
        p.innerHTML = `Succesfully updated username: ${newName.value}`;
        localStorage.setItem("username",newName.value);

        if(report === null){
            report = setInterval(()=>{
                br++;

                if(br === 3){
                    p.innerHTML="";
                    clearInterval(report);
                    br = 0;
                    report = null;
                }
            },1000)
        }
    }else{
        alert("Username need to be between 2 and 10 letters!")
    }
    newName.value = "";
})


// odabir sobe
let buttons = document.querySelector("#buttons");

buttons.addEventListener("click",e=>{
    e.preventDefault();

    if(e.target.tagName === "BUTTON"){
        ul.innerHTML = "";
        chatroom.updateRoom(e.target.id);
        localStorage.setItem("room",e.target.id)

        chatroom.getChats( data =>{
            chatUI.templateLI(data);
        })
    }
})


// ispis poruka
chatroom.getChats( data =>{
    chatUI.templateLI(data);
})








// check local storage
function checkLocal (key, dflt){
    if(key){
        return key;
    }else{
        return dflt;
    }
}









