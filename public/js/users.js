
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


//Chuc nang tu choi ket ban : lan dau tien vao trang 
const listButtonRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
if(listButtonRefuseFriend.length > 0) {
    listButtonRefuseFriend.forEach(button => {
        button.addEventListener("click", () => {
            //Viec 1: Xoa class "add" cho box user
            button.closest(".box-user").classList.add("refuse");

            //Viec 2: Gui len server user id userB
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


// SERVER_RETURN_LENGTH_ACCEPT_FRIEND
socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", (data) => {
    const badgeUsersAccept = document.querySelector(`[badge-users-accept="${data.userId}"]`);
    if(badgeUsersAccept) {
      badgeUsersAccept.innerHTML = data.length;
    }
})
  // End SERVER_RETURN_LENGTH_ACCEPT_FRIEND


// SERVER_RETURN_INFO_ACCEPT_FRIEND
socket.on("SERVER_RETURN_INFO_ACCEPT_FRIEND", (data) => {
    const dataUsersAccept = document.querySelector(`[data-users-accept="${data.userIdB}"]`);
  
    if(dataUsersAccept) {
        const boxUserA = document.createElement("div");
        boxUserA.classList.add("col-6");
        boxUserA.setAttribute("user-id",data.infoA._id);
        boxUserA.innerHTML = `
            <div class="box-user">
            <div class="inner-avatar">
                <img src="https://robohash.org/hicveldicta.png" alt="${data.infoA.fullName}">
            </div>
            <div class="inner-info">
                <div class="inner-name">${data.infoA.fullName}</div>
                <div class="inner-buttons">
                <button 
                    class="btn btn-sm btn-primary mr-1" 
                    btn-accept-friend="${data.infoA._id}"
                >
                    Chấp nhận
                </button>
                <button 
                    class="btn btn-sm btn-secondary mr-1" 
                    btn-refuse-friend="${data.infoA._id}"
                >
                    Xóa
                </button>
                <button 
                    class="btn btn-sm btn-secondary mr-1" 
                    btn-deleted-friend="" disabled=""
                >
                    Đã xóa
                </button>
                <button 
                    class="btn btn-sm btn-primary mr-1" 
                    btn-accepted-friend="" disabled=""
                >
                    Đã chấp nhận
                </button>
                </div>
            </div>
            </div>
        `;
  
        dataUsersAccept.appendChild(boxUserA);

        // Bắt sự kiện cho nút xóa
        const buttonRefuse = boxUserA.querySelector("[btn-refuse-friend]");
        buttonRefuse.addEventListener("click", () => {
            // Việc 1: Thêm class "refuse" cho box-user
            buttonRefuse.closest(".box-user").classList.add("refuse");

            // Việc 2: Gửi lên server userIdA
            const userIdA = buttonRefuse.getAttribute("btn-refuse-friend");
            socket.emit("CLIENT_REFUSE_FRIEND", userIdA);
        })

        //bat su kien cho nut chap nhan
        const buttonAccept = boxUserA.querySelector("[btn-accept-friend]");
        buttonAccept.addEventListener("click", () => {
            // Việc 1: Thêm class "accepted" cho box-user
            buttonAccept.closest(".box-user").classList.add("accepted");

            // Việc 2: Gửi lên server userIdA
            const userIdA = buttonAccept.getAttribute("btn-accept-friend");
            socket.emit("CLIENT_ACCEPT_FRIEND", userIdA);
        })
    }

})



//SERVER_RETURN_ID_CANCEL_FRIEND
socket.on("SERVER_RETURN_ID_CANCEL_FRIEND", (data) => {
   const dataUserAccept = document.querySelector(`[data-users-accept="${data.userIdB}"]`);
   if(dataUserAccept) {
        const boxUserA = dataUserAccept.querySelector(`[user-id="${data.userIdA}"]`);
        if(boxUserA) {
            dataUserAccept.removeChild(boxUserA);
        }
   }
   
})
//End SERVER_RETURN_ID_CANCEL_FRIEND