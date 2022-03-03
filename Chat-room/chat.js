class chatroom{
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

        }else if(un.length === 0){
            alert("Username not valid!");
        }else{
            this._userName ="#User"
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

    async addChat(msg) {
        let now = new Date();

        let newDoc = {
            message: msg,
            username: this.userName,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        }


        db.collection("chats")
        .doc()
        .set(newDoc)
        .then(()=>{
            console.log(`Succesfully added chat`);
        })
        .catch(err =>{
            console.log(`Could not add chat: ${err}`);
        })
    }

}


export default chatroom;