let fs=require('fs');


let f1pending=fs.promises.readFile("./f1.txt");
let f2pending=fs.promises.readFile("./f2.txt");
let f3pending=fs.promises.readFile("./f3.txt");

f1pending.then(function (data) {
    console.log("Content = "+data);
  });

  f1pending.catch(function (error) {  
      console.log(error);
  })
f2pending.then(function (data) {
    console.log("Content = "+data);
  });

  f2pending.catch(function (error) {  
      console.log(error);
  })
f3pending.then(function (data) {
    console.log("Content = "+data);
  });

  f3pending.catch(function (error) {  
      console.log(error);
  })