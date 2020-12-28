setTheme();
var isUpdate=false;
var curId=0;
var addIcon=document.querySelector(".addIcon");
document.querySelector(".additem").addEventListener("click",function(){
    if(isUpdate){
        updateNote(false);
        return;
    }
    addNewItem(false);
});
document.querySelector(".AddModal").addEventListener("click",function(){
    console.log("me");
    if(isUpdate){
        updateNote(true);
        return;
    }
    addNewItem(true);
});
document.querySelector(".switch").addEventListener("click",function(e){
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.querySelector(".titleHead").classList.add("has-text-light");
        }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.querySelector(".titleHead").classList.remove("has-text-light");

    }
    localStorage.setItem("darkMode",JSON.stringify(e.target.checked));
});
document.querySelector(".secondcol").addEventListener("click",(e)=>{
    var noteId=e.target.parentNode.parentNode.parentNode.id;
    e.target.classList.forEach((e)=>{
        if(e==="editButton"){
            if(screen.width>=1023){
            editNote(noteId,true);
            }
            else{
                console.log(screen.width);
                editNote(noteId,false);
            }
        }
        else if(e==="deleteButton"){
            deleteNote(noteId);
        }
    })
});
addIcon.addEventListener("click",()=>{
    document.querySelector(".modal").classList.add("is-active");
});
document.querySelector(".closeModal").addEventListener("click",()=>{
    closeModal();
})
var array=[];
var placehold=document.querySelector(".placeholder");

function editNote(id,noModal){
    getNotes();
    if(noModal===true){
    document.querySelector(".titleInput").value=array[id].title;
    document.querySelector(".notesInput").value=array[id].content;
    document.querySelector(".additem").innerHTML="Update";
    }
    else{
    document.querySelector(".modal").classList.add("is-active");
    document.querySelector(".titleInputModal").value=array[id].title;
    document.querySelector(".notesInputModal").value=array[id].content;
    document.querySelector(".AddModal").innerHTML="Update";
    }
    isUpdate=true;
    curId=id;
    
    
};
function updateNote(fromModal){
    var titleInputVal=fromModal?document.querySelector(".titleInputModal").value:document.querySelector(".titleInput").value;
    var contentInputVal=fromModal?document.querySelector(".notesInputModal").value: document.querySelector(".notesInput").value;
    var note={
        title:titleInputVal,
        content:contentInputVal,
        date:new Date()
    }
    console.log(note);
    if(note.title.length===0||note.content.length===0)return;
console.log(curId);
array[curId]=note;
localStorage.setItem("notes",JSON.stringify(array));
displayItem();
    isUpdate=false;
    document.querySelector(".additem").innerHTML="Add";
    document.querySelector(".AddModal").innerHTML="Add";
    clearFields();
    closeModal();

}
function deleteNote(id){
    console.log(id);
    array.splice(id,1);
    localStorage.setItem("notes",JSON.stringify(array));
    displayItem();
}
function setTheme(){
    var DarkModeBool=JSON.parse(localStorage.getItem("darkMode"));
    var darkButton=document.querySelector(".ridam");
    console.log(DarkModeBool);
    if (DarkModeBool) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.querySelector(".titleHead").classList.add("has-text-light");
        darkButton.checked=true;
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.querySelector(".titleHead").classList.remove("has-text-light");
    }
};

var addNewItem=function(fromModal){
    var titleInputVal,contentInputVal;
    if(fromModal===true){
        titleInputVal=document.querySelector(".titleInputModal").value;
        contentInputVal=document.querySelector(".notesInputModal").value;
    }
    else{
        titleInputVal=document.querySelector(".titleInput").value;
        contentInputVal=document.querySelector(".notesInput").value;
      
    }
    var notes={
        title:titleInputVal,
        content:contentInputVal,
        date:new Date()
    }
    console.log(notes)
    if(notes.title.length===0||notes.content.length===0)return;
    getNotes();


    array.push(notes);
    clearFields();
    localStorage.setItem("notes",JSON.stringify(array));
    displayItem();
    closeModal();

}
var clearFields=function(){
    console.log("chl rya")

    document.querySelector(".titleInputModal").value="";
    document.querySelector(".titleInput").value="";
    document.querySelector(".notesInputModal").value="";
    document.querySelector(".notesInput").value="";
}
var getNotes= function(){
    var localGet=localStorage.getItem("notes");
    if(localGet){
        array=JSON.parse(localGet);
    }
}
var getInputValues=function(){
    
}
var displayItem=function(){
    getNotes();

    var grid=document.querySelector("#grid");
    grid.innerHTML="";

    if(array.length===0){
        grid.classList.add("is-hidden");
    }
    else{
        placehold.classList.add("is-hidden");
        grid.classList.remove("is-hidden");
    array.forEach((element,i) => {
        if(element!==null){
            var today =new Date(element.date);
            var dd = today.getDate();
            var mm = today.getMonth()+1;
            var yyyy = today.getFullYear();
            var date=`${dd}/${mm}/${yyyy}`;
    html=`<div class="card" id="${i}"><div class="card-content"><div class="notesHead"><p class="subtitle">${element.title}</p><p class="date">${date}</p></div><p class="title is-size-6">${element.content}</p></div><br><br><br><footer class="card-footer"><p class="card-footer-item"><button class="button is-white is-fullwidth editButton">Edit</button></p><p class="card-footer-item"><button class="button is-white is-fullwidth deleteButton">Delete</button></p></footer></div>`  
    grid.innerHTML+=html;
        }
       
    });
    }
}



// hi popup



function closeModal(){
    document.querySelector(".modal").classList.remove("is-active");
};

displayItem();

console.log(document.querySelector(".titleInputModal").value);