document.addEventListener("DOMContentLoaded",function(){
    const items=document.getElementById("items");
    const saveButton=document.getElementById("save");
    const notList=document.getElementById("notList");
    const oldnotes=JSON.parse(localStorage.getItem("userNotes"))||[];
    function printNotes(){
        notList.innerHTML="";
        for (const note of oldnotes){
            const notElement=document.createElement("li");
            notElement.textContent=note;
            const delButton=document.createElement("button");
            delButton.textContent="Delete";
            delButton.addEventListener("click",function(){
                const delIndex=oldnotes.indexOf(note);
                oldnotes.splice(delIndex,1);
                localStorage.setItem("userNotes",JSON.stringify(oldnotes));
                printNotes();
            });
            notElement.appendChild(delButton);
            notList.appendChild(notElement);
        }
    }
    printNotes();
    saveButton.addEventListener("click",function(){
        const newNot=items.value;
        if(newNot){
            oldnotes.push(newNot);
            localStorage.setItem("userNotes",JSON.stringify(oldnotes));
            printNotes();
            items.value="";
        }
    });
});