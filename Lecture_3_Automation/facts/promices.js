let fs=require('fs');


let f1pending=fs.promises.readFile("./f1.txt");

f1pending.then(function (data) {
    console.log("Content = "+data);
  });

  f1pending.catch(function (error) {  
      console.log(error);
  })