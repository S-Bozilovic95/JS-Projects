class ChatUI{
    constructor(l){
        this.lista = l;
    }

    // setter
    set lista(l){
        this._lista = l;
    }

    // getter
    get lista(){
        return this._lista;
    }

    
    // metodi
    templateLI(doc){
        this.lista.innerHTML += `<li class="${doc.data().username}" id ="${doc.id}"><span class ="name">${doc.data().username}</span> <span class ="message">${doc.data().message}</span> <span class ="date">${this.formatTime(doc.data().created_at.toDate())}<i class="fas solid fa-trash"></i></span></li>`;
    }



    formatTime(d){
        let now = new Date();
        let day = d.getDate();
        let month = d.getMonth()+1;
        let year = d.getFullYear();
        let hours = d.getHours();
        let minutes = d.getMinutes();

        let fTime ="";

        if(day === now.getDate() && month === now.getMonth()+1 && year === now.getFullYear()){
            fTime = ` ${String(hours).padStart(2,"0")}: ${String(minutes).padStart(2,"0")}`;
        }else{
            fTime = `${String(day).padStart(2,"0")}.${String(month).padStart(2,"0")}.${year} - ${String(hours).padStart(2,"0")}: ${String(minutes).padStart(2,"0")}`;
        }

        return fTime;
    }
    

    reorderMessages(doc){
        let li = document.querySelectorAll("li")
        
        li.forEach(item =>{
          if(item.classList.contains(doc)){
              item.classList.add("me");
          }else{
              item.classList.remove("me");
          } 
        })
    }

    
}

export default ChatUI;