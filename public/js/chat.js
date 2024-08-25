const socket = io();

// CLIENT_SEND_MESSAGE 
const formChat = document.querySelector(".chat .inner-form");
if(formChat) {
  formChat.addEventListener("submit", (event) => {
    event.preventDefault();

    const content = event.target.content.value;
    if(content) {
      socket.emit("CLIENT_SEND_MESSAGE", {
        content: content
      });
      event.target.content.value = "";
    }
  })
}

// END CLIENT_SEND_MESSAGE 


socket.on("SERVER_RETURN_MESSAGE", (data) => {

    const myId = document.querySelector("[my-id]").getAttribute("my-id");
    
    const div = document.createElement("div");

    let htmlFullName = "";

    if(myId == data.userId) {
        div.classList.add("inner-outgoing");
    } else {
        div.classList.add("inner-incoming");
        htmlFullName = `<div class = "inner-name">${data.fullName}</div>`
    }

    div.innerHTML = `
        ${htmlFullName} 
        <div class = "inner-content">${data.content}</div>
    `;
    const body = document.querySelector(".chat .inner-body");
    body.appendChild(div);
});


const bodyChat = document.querySelector(".chat .inner-body");
if(bodyChat) {
    bodyChat.scrollTop = bodyChat.scrollHeight;
}