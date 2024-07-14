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


//form Search 

const formSearch = document.querySelector("[form-search]");

if(formSearch){
    let url = new URL(window.location.href)
    formSearch.addEventListener("submit",(event) => {
        event.preventDefault(); // ngan chan hanh vi mac dinh : load lai trang
        const keyword = event.target.elements.keyword.value;
        if(keyword){
            url.searchParams.set("keyword",keyword); 
        }
        else {
            url.searchParams.delete("keyword");
        }

        window.location.href = url.href;
    });
}

//end form search

//Phan trang

const listButtonPagination = document.querySelectorAll("[button-pagination");
if(listButtonPagination.length > 0){
    listButtonPagination.forEach(button => {
        button.addEventListener("click", () =>{
            const page = button.getAttribute("button-pagination");
            
            let url = new URL(window.location.href);
            
            url.searchParams.set("page",page);

            window.location.href = url.href;
        });
        
    });
}


//end phan trang


//Button Change Status


const listButtonChangeStatus = document.querySelectorAll("[button-change-status]");
if(listButtonChangeStatus.length > 0) {
  listButtonChangeStatus.forEach(button => {
    button.addEventListener("click", () => {
      const link = button.getAttribute("link");
      fetch(link, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
      })
      .then(res => res.json())
      .then(data => {
        if(data.code == 200) {
          window.location.reload();
        }
      })
  });
});
}

//end Button Change Status



//Check Item

const inputCheckAll = document.querySelector("input[name='checkall']");

if(inputCheckAll){
    const listInputCheckItem = document.querySelectorAll("input[name='checkItem']");

    //Bat su kien click vao nut checkAll
    inputCheckAll.addEventListener("click", () => {
        console.log(inputCheckAll.checked); // checked tra ra true, false
        listInputCheckItem.forEach(inputCheckItem => {
            inputCheckItem.checked = inputCheckAll.checked;
        }); 
    });

    //Bat su kien click vao nut checkItem

    listInputCheckItem.forEach(inputCheckItem => {
        inputCheckItem.addEventListener("click", () => {
            const listInputCheckItemChecked = document.querySelectorAll("input[name='checkItem']:checked");
            console.log(listInputCheckItemChecked.length);
            console.log(listInputCheckItem.length);

            if(listInputCheckItemChecked.length == listInputCheckItem.length){
                inputCheckAll.checked = true;
            }
            else{
                inputCheckAll.checked = false;
            }
        });
    })
    


}

    

//End check Item