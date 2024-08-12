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
        listInputCheckItem.forEach(inputCheckItem => {
            inputCheckItem.checked = inputCheckAll.checked;
        }); 
    });

    //Bat su kien click vao nut checkItem

    listInputCheckItem.forEach(inputCheckItem => {
        inputCheckItem.addEventListener("click", () => {
            const listInputCheckItemChecked = document.querySelectorAll("input[name='checkItem']:checked");
            // console.log(listInputCheckItemChecked.length);
            // console.log(listInputCheckItem.length);

            if(listInputCheckItemChecked.length == listInputCheckItem.length){
                inputCheckAll.checked = true;
            }
            else{
                inputCheckAll.checked = false;
            }
        });
    });
    
}


//End check Item


//Box Actions

const boxActions = document.querySelector("[box-actions]");
if(boxActions) {
  const button = boxActions.querySelector("button");

  button.addEventListener("click", () => {
    const select = boxActions.querySelector("select");
    const status = select.value;

    const listInputChecked = document.querySelectorAll("input[name='checkItem']:checked");
    const ids = [];
    listInputChecked.forEach(input => {
      ids.push(input.value);
    });

    if(status != "" && ids.length > 0) {
      const dataChangeMulti = {
        status: status,
        ids: ids
      };

      const link = boxActions.getAttribute("box-actions");

      fetch(link, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataChangeMulti),
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == 200) {
            window.location.reload();
          }
        })
    } else {
      alert("Hành động và checkItem phải được chọn!");
    }
  });
}

//End boxActions


// Xóa bản ghi

const listButtonDelete = document.querySelectorAll("[button-delete]");
if(listButtonDelete.length > 0) {
  listButtonDelete.forEach(button => {
    button.addEventListener("click", () => {
      
      // console.log(id);

      const link = button.getAttribute("button-delete");

      fetch(link, {
        method: "PATCH"
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
//End Xóa bản ghi


//Thung rac

  //Khoi phuc ban ghi

const listButtonRestore = document.querySelectorAll("[button-restore]");
if(listButtonRestore.length > 0) {
  listButtonRestore.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("button-restore");
      
      fetch(`/admin/products/restore/${id}`, {
        method: "PATCH"
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
  //End khoi phuc ban ghi



  //Xoa vinh Vien
const listButtonFullyDelete = document.querySelectorAll("[button-permanently-delete]");
if(listButtonFullyDelete.length > 0) {
  listButtonFullyDelete.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("button-permanently-delete");

      fetch(`/admin/products/permanentlyDelete/${id}`, {
        method: "DELETE"
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
  //End xóa vĩnh viễn

//End thung rac


//Thay doi vi tri
const listInputPosition = document.querySelectorAll("input[name='position']");
if(listInputPosition.length > 0){
  listInputPosition.forEach(input => {
    input.addEventListener("change",() => {
      const position = parseInt(input.value);
      const link = input.getAttribute("link");

      // console.log(position);
      // console.log(link);
      
      fetch(link,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          position: position
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
        })
    });
  });
}

//End thay doi vi tri


//show-alert

const showAlert = document.querySelector("[show-alert]");
if(showAlert){
  let time = showAlert.getAttribute("show-alert") || 3000;
  time = parseInt(time);
  setTimeout(() => {
    showAlert.classList.add("hidden");
  },time);
}

//end show-alert



//Upload image 
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener("change", () => {
    const file = uploadImageInput.files[0];
    if(file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  });
}

//End upload image


//Sort 
const sort = document.querySelector("[sort]");
if(sort) {
  let url = new URL(window.location.href);

  const select = sort.querySelector("[sort-select]");
  select.addEventListener("change", () => {
    const [sortKey, sortValue] = select.value.split("-");

    if(sortKey && sortValue) {
      url.searchParams.set("sortKey", sortKey);
      url.searchParams.set("sortValue", sortValue);

      window.location.href = url.href;
    }
  })


  // Thêm selected mặc định cho option
  const defaultSortKey = url.searchParams.get("sortKey");
  const defaultSortValue = url.searchParams.get("sortValue");

  if(defaultSortKey && defaultSortValue) {
    const optionSelected = select.querySelector(`option[value="${defaultSortKey}-${defaultSortValue}"]`);
    optionSelected.selected = true;
    // optionSelected.setAttribute("selected", true);
  }

//tinh nang clear
  const buttonClear = sort.querySelector("[sort-clear]");
  if(buttonClear) {
    buttonClear.addEventListener("click", () => {
      url.searchParams.delete("sortKey");
      url.searchParams.delete("sortValue");

      window.location.href = url.href;
    })
  }

}

//End Sort



//ButtonChangeStatusCategory
const listButtonChangeStatusCategory = document.querySelectorAll("[button-change-status-category]");
if(listButtonChangeStatusCategory.length > 0) {
  listButtonChangeStatusCategory.forEach(button => {
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


//End ButtonChangeStatusCategory


//Xoa ban ghi Category
const listButtonDeleteCategory = document.querySelectorAll("[button-delete-category]");
if(listButtonDeleteCategory.length > 0) {
  listButtonDeleteCategory.forEach(button => {
    button.addEventListener("click", () => {
      
      // console.log(id);

      const link = button.getAttribute("button-delete-category");

      fetch(link, {
        method: "PATCH"
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

//End xoa ban ghi category



//Khoi phuc ban ghi category
const listButtonRestoreCategory = document.querySelectorAll("[button-restore-category]");
if(listButtonRestoreCategory.length > 0) {
  listButtonRestoreCategory.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("button-restore-category");
      
      fetch(`/admin/products-category/restore/${id}`, {
        method: "PATCH"
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
  //End khoi phuc ban ghi Category



  //Xoa vinh Vien Category
const listButtonFullyDeleteCategory = document.querySelectorAll("[button-permanently-delete-category]");
if(listButtonFullyDeleteCategory.length > 0) {
  listButtonFullyDeleteCategory.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("button-permanently-delete-category");

      fetch(`/admin/products-category/permanentlyDelete/${id}`, {
        method: "DELETE"
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
  //End xóa vĩnh viễn Category


//Vi tri Category
const listInputPositionCategory = document.querySelectorAll("input[name='position-category']");
if(listInputPositionCategory.length > 0){
  listInputPositionCategory.forEach(input => {
    input.addEventListener("change",() => {
      const position = parseInt(input.value);
      const link = input.getAttribute("link");
      
      fetch(link,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          position: position
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
        })
    });
  });
}

//End vi tri Category



//Xoa ban ghi Nhom quyen
const listButtonDeleteRole = document.querySelectorAll("[button-delete-role]");
if(listButtonDeleteRole.length > 0) {
  listButtonDeleteRole.forEach(button => {
    button.addEventListener("click", () => {
      
      // console.log(id);

      const link = button.getAttribute("button-delete-category");

      fetch(link, {
        method: "PATCH"
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
//End xoa ban ghi Nhom quyen


//Khoi phuc ban ghi Nhom quyen
const listButtonRestoreRole = document.querySelectorAll("[button-restore-role]");
if(listButtonRestoreRole.length > 0) {
  listButtonRestoreRole.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("button-restore-role");
      
      fetch(`/admin/roles/restore/${id}`, {
        method: "PATCH"
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
  //End khoi phuc ban ghi Nhom quyen


  //Xoa vinh Vien nhom quyen
const listButtonFullyDeleteRole = document.querySelectorAll("[button-permanently-delete-role]");
if(listButtonFullyDeleteRole.length > 0) {
  listButtonFullyDeleteRole.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("button-permanently-delete-role");

      fetch(`/admin/roles/permanentlyDelete/${id}`, {
        method: "DELETE"
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
  //End xóa vĩnh viễn nhom quyen


//Phân quyền
const tablePermissions = document.querySelector("[table-permissions]");
if(tablePermissions) {
  const buttonSubmit = document.querySelector("[button-submit]");
  buttonSubmit.addEventListener("click", () => {
    const roles = [];

    const listElementRoleId = tablePermissions.querySelectorAll("[role-id]");
    for (const element of listElementRoleId) {
      const roleId = element.getAttribute("role-id");
      const role = {
        id: roleId,
        permissions: []
      };

      const listInputChecked = tablePermissions.querySelectorAll(`input[data-id="${roleId}"]:checked`);

      listInputChecked.forEach(input => {
        const dataName = input.getAttribute("data-name");
        role.permissions.push(dataName);
      });

      roles.push(role);
    }

    const path = buttonSubmit.getAttribute("button-submit");

    fetch(path, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roles)
    })
      .then(res => res.json())
      .then(data => {
        if(data.code == 200) {
          swal({
            title: "Sucessfully Updated",
            text: "You clicked the button!",
            icon: "success",
            button: "End",
          });
        }
      })
  });
}

//End Phân quyền



//Xoa ban ghi tai khoan
const listButtonDeleteAccount = document.querySelectorAll("[button-delete-account]");
if(listButtonDeleteAccount.length > 0) {
  listButtonDeleteAccount.forEach(button => {
    button.addEventListener("click", () => {
      // console.log(id);
      const link = button.getAttribute("button-delete-account");
      // console.log(link);
      fetch(link, {
        method: "PATCH"
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

//End xoa ban ghi tai khoan



//Khoi phuc ban ghi tai khoan
const listButtonRestoreAccount = document.querySelectorAll("[button-restore-account]");
if(listButtonRestoreAccount.length > 0) {
  listButtonRestoreAccount.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("button-restore-account");
      
      fetch(`/admin/accounts/restore/${id}`, {
        method: "PATCH"
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
  //End khoi phuc ban ghi tai khoan


  //Xoa vinh Vien tai khoan
const listButtonFullyDeleteAccount = document.querySelectorAll("[button-permanently-delete-account]");
if(listButtonFullyDeleteAccount.length > 0) {
  listButtonFullyDeleteAccount.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("button-permanently-delete-account");

      fetch(`/admin/accounts/permanentlyDelete/${id}`, {
        method: "DELETE"
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
  //End xóa vĩnh viễn tai khoan