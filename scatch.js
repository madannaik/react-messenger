           // console.log(socket.id,"socket connection is made");


            // // create a socket room upon join and add respective clients to room.
            // socket.on("joinchat", function (data) {
            //     socket.email = data.email;
            //     socket.chatID = data.chatId;
            //     isActive(true,data.email);
            //     // UserModel.findOneAndUpdate({"email":data.email},{$set:{isOnline:true}},{new:true},(err,docs)=>console.log(docs));
            //     socket.join(data.chatId);
            //     socket.in(socket.chatId).socketsJoin(socket.id);
            // });
            // socket.on("send_message", (data) => {
            //     const { from, to, text, date, id } = data;
            //     const message = { from: from, to: to, text: text, time: date };
            //     updateConversation(id,message,()=>{
            //         socket.to(id).emit("recieve_message",message);
            //     })
            //     // Message.findOneAndUpdate({ _id: id }, { $push: { message: message } }, (err,docs) => {
            //     //     socket.to(id).emit("recieve_message",message);
            //     // });
            // })
            // socket.on("disconnect",()=>{
            //    let email = socket.disconnect().email;
            //    isActive(false,email);
            //     // UserModel.findOneAndUpdate({email:email},{$set:{isOnline:false}},{new:true},(err,docs)=>{console.log(docs)});   
            // })