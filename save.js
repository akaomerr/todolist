window.addEventListener('load',function(){
    displaySavedItems();
    toggleDeleteButtonVisibility();
});
document.getElementById("delete").addEventListener("click",function(){
    var checkboxes=document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox){
        if(checkbox.checked){
            checkbox.parentElement.remove();
            savedItemsLocalStorage();
            toggleDeleteButtonVisibility();
        }
    });
});
document.getElementById("items").addEventListener("keyup", function(event){
    if(event.key==="Enter"){
        var newItem=document.getElementById("items").value;
        if(newItem.trim() !==""){
            addItemToList(newItem);
            document.getElementById("items").value = ""
            savedItemsLocalStorage();
            toggleDeleteButtonVisibility();
        }
    }
});

document.getElementById("save").addEventListener("click",function(){
    var newItem=document.getElementById("items").value;
    if(newItem.trim() !==""){
        addItemToList(newItem);
        document.getElementById("items").value = ""
        savedItemsLocalStorage();
        toggleDeleteButtonVisibility();
    }
});

function toggleDeleteButtonVisibility() {
    var savedItems = localStorage.getItem("todoItems");
    var deleteButton = document.getElementById("delete");

    if (savedItems) {
        savedItems = JSON.parse(savedItems);
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        if (checkboxes.length > 0 || savedItems.length > 0) {
            deleteButton.style.display = "block"; 
        } else {
            deleteButton.style.display = "none";
        }
    } else {
        deleteButton.style.display = "none";
    }
}


function addItemToList(text){
    var noteList=document.getElementById("noteList");
    var listItem=document.createElement("li");
    listItem.className="list-group-item";

    var checkbox=document.createElement("input");
    checkbox.className="form-check-input me-sm-3";
    checkbox.type="checkbox";

    var label = document.createElement("label");
    label.className = "form-check-label label-wrap";
    label.textContent = text;
    
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    noteList.appendChild(listItem);
}

function savedItemsLocalStorage(){
    var items=[];
    var checkboxes=document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox){
        var label=checkbox.nextElementSibling;
        items.push({text:label.textContent,checked:checkbox.checked});
    });
    localStorage.setItem("todoItems",JSON.stringify(items));
}

function displaySavedItems() {
    var savedItems = localStorage.getItem("todoItems");
    if (savedItems) {
        savedItems = JSON.parse(savedItems);
        savedItems.forEach(function (item) {
            addItemToList(item.text);
            if (item.checked) {
                var checkboxes = document.querySelectorAll('input[type="checkbox"]');
                checkboxes[checkboxes.length - 1].checked = true;
            }
        });
    }
}