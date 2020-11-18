let fs=require('fs');


let f1pending=fs.promises.readFile("./f1.txt");

f1pending.then(function (data) {  
    console.log("content = "+data);
    let f2pending=fs.promises.readFile("./f2.txt");
    return f2pending;
}).then(function (data) {  
    console.log("content = "+data);
    let f3pending=fs.promises.readFile("./f3.txt");
    return f3pending;
}).then(function(data){
    console.log("content = "+data);
})
.catch(function(error){
    console.log(error);
});