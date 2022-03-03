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
        this.lista.innerHTML += `<li>${doc.username} : ${doc.message} ${this.formatTime(doc.created_at.toDate())}</li>`;
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

}

export default ChatUI;