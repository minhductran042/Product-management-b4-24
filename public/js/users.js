
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