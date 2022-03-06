import Chatroom from "./chat.js"
import ChatUI from "./ui.js"

// reference
let ul = document.querySelector("ul");
let formSend = document.querySelector("#formMessage");
let formUsername = document.querySelector("#formUsername");
let message = document.querySelector("#inputMessage");
let newName = document.querySelector("#inputUsername");
let p = document.querySelector("#screen p");
let buttons = document.querySelector("#buttons");
let colorForm = document.querySelector("#colorForm");
let screen = document.querySelector("#screen");
let colorPick = document.querySelector("#pickColor");
let formDates = document.querySelector("#formDates");
let startDate = document.querySelector("#startDate");
let endDate = document.querySelector("#endDate");
let allButtons = document.querySelectorAll("button");

// klase
let chatroom = new Chatroom(checkLocal(localStorage.room,"general"),checkLocal(localStorage.username,"anonymus"));
let chatUI = new ChatUI(ul);

// color check
setLocalColor();

// funkcije

// dodavanje poruke
formSend.addEventListener("submit",e =>{
    e.preventDefault();
    
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

    let report = null;
    let br = 0;

    if(newName.value.trim() != 0 && newName.value.length<=10 && newName.value.length>=2){
        chatroom.updateUsername(newName.value);
        p.innerHTML = `Succesfully updated username: ${newName.value}`;
        localStorage.setItem("username",newName.value);
        chatUI.reorderMessages(checkLocal(localStorage.username,"anonymus"));

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
buttons.addEventListener("click",e=>{
    e.preventDefault();

    if(e.target.tagName === "BUTTON"){
        ul.innerHTML = "";
        chatroom.updateRoom(e.target.id);
        localStorage.setItem("room",e.target.id)

        chatroom.getChats( data =>{
            chatUI.templateLI(data);
            chatUI.reorderMessages(checkLocal(localStorage.username,"anonymus"));
        })

        allButtons.forEach(btn=>{
            btn.classList.remove("selected");
        })
        e.target.classList.add("selected");
    }
})


// ispis poruka
chatroom.getChats( data =>{
    chatUI.templateLI(data);
    chatUI.reorderMessages(checkLocal(localStorage.username,"anonymus"));
})

// brisanje poruka

// let li = document.querySelector("i");

ul.addEventListener("click",e =>{
    e.preventDefault();

    if(e.target.tagName === "I"){
        let li = e.target.parentElement.parentElement;
        let id = li.id;

        if(li.classList.contains("me")){
            if(confirm("Are You sure You want to delete this message permanently?")){
                chatroom.deleteMessage(id);
                li.remove();
            }

        }else{
            li.remove();
        }
    }
})






// check local storage
function checkLocal (key, dflt){
    if(key){
        return key;
    }else{
        return dflt;
    }
}

function setLocalColor (){
    if(localStorage.color){
        return screen.style.backgroundColor = localStorage.getItem("color");
    }else{
        return screen.style.backgroundColor =" #ffffff";
    }
}


// odabir boje

colorForm.addEventListener("submit",e =>{
    e.preventDefault();
    screen.style.backgroundColor = colorPick.value;
    localStorage.setItem("color",colorPick.value);
})


// sortiranje datuma
formDates.addEventListener("submit",e=>{
    e.preventDefault();
    ul.innerHTML = "";

    if(startDate.value.length === 0 || endDate.value.length === 0){
        alert("Invalid date insert!");
    }else{
        chatroom.sortMessage(startDate.value,endDate.value,data =>{
            chatUI.templateLI(data);
            chatUI.reorderMessages(checkLocal(localStorage.username,"anonymus"));
        });
    }

})









