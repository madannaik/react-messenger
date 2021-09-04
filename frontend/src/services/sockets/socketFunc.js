class SocketFucntions {

    constructor(socket) {
        this.socketconn = socket;
    }

   joinChat (email,id){
       this.socketconn.emit("joinchat",{
        email: email,
        chatId: id,
       })
   }
   sendMessage(){
       
   }
}

export default new SocketFucntions();