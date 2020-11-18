let fs=require('fs');


let f1pending=fs.promises.readFile("./f1.txt");

f1pending.then(function (data) {
    console.log("Content = "+data);
    let f2pending=fs.promises.readFile("./f2.txt");
    f2pending.then(function (data) {  
        console.log("Content = "+data);
        let f3pending=fs.promises.readFile("./f3.txt");
        f3pending.then(function (data) {  
            console.log("Content = "+data);
        });
    });
  });

  f1pending.catch(function (error) {  
      console.log(error);
  })