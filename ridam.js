setTheme();
var isUpdate=false;
var curId=0;
document.querySelector(".additem").addEventListener("click",function(){
    if(isUpdate){
        updateNote();
        return;
    }
    addNewItem();
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
            editNote(noteId);
        }
        else if(e==="deleteButton"){
            deleteNote(noteId);
        }
    })
});

var array=[];
var placehold=document.querySelector(".placeholder");

function editNote(id){
    getNotes();
    document.querySelector(".titleInput").value=array[id].title;
    document.querySelector(".notesInput").value=array[id].content;
    document.querySelector(".additem").innerHTML="Update";
    isUpdate=true;
    curId=id;
    
};
function updateNote(){
    var titleInputVal= document.querySelector(".titleInput").value;
    var contentInputVal= document.querySelector(".notesInput").value;
    var note={
        title:titleInputVal,
        content:contentInputVal,
        date:new Date()
    }
    if(note.title.length===0||note.content.length===0)return;
console.log(curId);
array[curId]=note;
localStorage.setItem("notes",JSON.stringify(array));
displayItem();
    isUpdate=false;
    document.querySelector(".additem").innerHTML="Add";
    clearFields();

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

var addNewItem=function(){
    var titleInputVal= document.querySelector(".titleInput").value;
    var contentInputVal= document.querySelector(".notesInput").value;
    var notes={
        title:titleInputVal,
        content:contentInputVal,
        date:new Date()
    }
    if(notes.title.length===0||notes.content.length===0)return;
    getNotes();


    array.push(notes);
    clearFields();
    localStorage.setItem("notes",JSON.stringify(array));
    displayItem();

}
var clearFields=function(){
    document.querySelector(".titleInput").value="";
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
    html=`<div class="card" id="${i}"><div class="card-content"><div class="notesHead"><p class="subtitle">${element.title}</p><p class="date">${date}</p></div><p class="title is-size-6">${element.content}</p></div><footer class="card-footer"><p class="card-footer-item"><button class="button is-white is-fullwidth editButton">Edit</button></p><p class="card-footer-item"><button class="button is-white is-fullwidth deleteButton">Delete</button></p></footer></div>`  
    grid.innerHTML+=html;
        }
       
    });
    }
}

displayItem();
