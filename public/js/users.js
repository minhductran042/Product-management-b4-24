
//Chuc nang gui yeu cau
const listButtonAddFriend = document.querySelectorAll("[btn-add-friend]");
if(listButtonAddFriend.length > 0) {
    listButtonAddFriend.forEach(button => {
        button.addEventListener("click", () => {
            //Viec 1: Them class "add" cho box user
            button.closest(".box-user").classList.add("add");


            //Viec 2: Gui len server user id 
            const userIdB = button.getAttribute("btn-add-friend");
            socket.emit("CLIENT_ADD_FRIEND",  userIdB);
        });
    })
}

//Het chuc nang gui yeu cau


//Chuc nang huy gui yeu cau
const listButtonCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if(listButtonCancelFriend.length > 0) {
    listButtonCancelFriend.forEach(button => {
        button.addEventListener("click", () => {
            //Viec 1: Xoa class "add" cho box user
            button.closest(".box-user").classList.remove("add");

            //Viec 2: Gui len server user id 
            const userIdB = button.getAttribute("btn-cancel-friend");
            socket.emit("CLIENT_CANCEL_FRIEND",  userIdB);
        });
    })
}

//End Chuc nang huy gui yeu cau


//Chuc nang tu choi ket ban
const listButtonRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
if(listButtonRefuseFriend.length > 0) {
    listButtonRefuseFriend.forEach(button => {
        button.addEventListener("click", () => {
            //Viec 1: Xoa class "add" cho box user
            button.closest(".box-user").classList.add("refuse");

            //Viec 2: Gui len server user id 
            const userIdB = button.getAttribute("btn-refuse-friend");
            socket.emit("CLIENT_REFUSE_FRIEND",  userIdB);
        });
    })
}
//End chuc nang tu choi ket ban


//Chuc nang chap nhan ket ban
const listButtonAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
if(listButtonAcceptFriend.length > 0) {
    listButtonAcceptFriend.forEach(button => {
        button.addEventListener("click", () => {
            //Viec 1: Xoa class "add" cho box user
            button.closest(".box-user").classList.add("accepted");

            //Viec 2: Gui len server user id 
            const userIdB = button.getAttribute("btn-accept-friend");
            socket.emit("CLIENT_ACCEPT_FRIEND",  userIdB);
        });
    })
}

//End chuc nang chap nhan ket ban