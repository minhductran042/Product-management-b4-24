//Button Status 

const listButtonStatus =  document.querySelectorAll("[button-status]");

if(listButtonStatus.length > 0){
    let url = new URL(window.location.href);  //tao ra link urf moi
    //Bat su kien click
    listButtonStatus.forEach(button => {
        button.addEventListener("click",() =>{
            const status = button.getAttribute("button-status");
            if(status){
                url.searchParams.set("status",status); 
            }
            else {
                url.searchParams.delete("status");
            }

            window.location.href = url.href; //gan urf bang link urf moi
        });
    });

    //Them class active mac dinh

    const statusCurrent = url.searchParams.get("status") || "";
    const buttonCurrent = document.querySelector(`[button-status="${statusCurrent}"]`);
    if(buttonCurrent) {
        buttonCurrent.classList.add("active");
    }
}

//End Button Status 