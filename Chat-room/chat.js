class Chatroom{
    constructor(r,u){
       this.room = r;
       this.userName = u;
       this.chats = db.collection("chats");
    }


    //setters
    set room(r){
        let rm = r.trim();

        if(rm.length>0){
            this._room = rm;
        }else{
            this._room = "#Room";
        }
    }

    set userName(u){
        let un = u.trim();

        if(un.length<=10 && un.length>=2){
            this._userName = un;

        }else{
            alert("Username not valid!");
        }
    }


    //getters 
    get room(){
        return this._room;
    }

    get userName(){
        return this._userName;
    }



    // metodi

    // asinhroni metod se koristi zato sto vraca promis 
    // nakon toga mozemo ga koristiti univerzalno i za bilo koju svrhu
    // iz tog razloga than i catch granu pisemo kada pozivamo metod u main.js
    // jer necemo svaki put hteti da ispisemo istu poruku za ovaj metod
    // jos jedan razlog zasto je se koristi async je zato sto 
    // mozemo da koristimo await odnosno da sacekamo odg od baze
    // na taj nacin smo sigurni da necemo dobiti null ili undefined
    
    async addChat(msg) {
        let now = new Date();

        let newDoc = {
            message: msg,
            username: this.userName,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        }

       let response = await this.chats.add(newDoc);
       return response;
    }



    getChats(func) {

        this.chats
        .where("room","==",this.room)
        .orderBy("created_at")
        .onSnapshot(snapshot =>{
            
         snapshot.docChanges().forEach(change => {
                if(change.type === "added"){
                    func(change.doc.data());
                }

            });
        })
    }

    updateUsername(newName){
        if(newName.length<=10 && newName.length>=2){
            this.userName = newName;

        }else{
            alert("Username not valid!");
        }
    }


    updateRoom(newRoom){
        this.room = newRoom;  
    }

}

export default Chatroom;