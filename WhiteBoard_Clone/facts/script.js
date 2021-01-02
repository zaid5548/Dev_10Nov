// let addBtn=document.querySelector(".add");
// let todos=document.querySelector(".todos");

// addBtn.addEventListener("click",function(){

//     let li=document.createElement("li");
//     // console.log(li);
//     li.innerHTML="Hey I am a todos and i am Completed";
//     document.body.append(li);

// })

// let addBtn=document.querySelector(".add");
// let todos=document.querySelector(".todos");
// let todoInput=document.querySelector("#todo")

// addBtn.addEventListener("click",function(){

//     let todo=todoInput.value;
//     if(todo){
//         let newTodo=document.createElement("li");
//         newTodo.innerHTML=todo;
//         todos.append(newTodo);
//         todoInput.value="";
//     }

// })

// *************************************************************
let addBtn=document.querySelector(".add");
let todos=document.querySelector(".todos");
let todoInput=document.querySelector("#todo")

addBtn.addEventListener("click",function(){

    let todo=todoInput.value;
    if(todo){
        let newTodo=document.createElement("li");
        let pTag=document.createElement("p");
        pTag.innerHTML=todo;

        let close=document.createElement("button")
        close.innerHTML="X";

        close.addEventListener("click",function(){
            close.parentElement.remove();
        });

        newTodo.append(pTag);
        newTodo.append(close);

        todos.append(newTodo);
        todoInput.value="";
    }

})

