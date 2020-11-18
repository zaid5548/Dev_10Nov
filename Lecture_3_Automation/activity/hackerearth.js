let puppeteer=require('puppeteer');
const { gunzip } = require('zlib');

id="koxes42892@pidouno.com";
pw="Kh@an123456";

let tab;

let windowOpenPromise=puppeteer.launch({
    headless:false,
    defaultViewport:null,
    args:["--start-maximized"]
});

windowOpenPromise.then(function(browser){
    let pagesPromise=browser.pages();
    return pagesPromise;
})
.then(function (pages) { 
    let page=pages[0];
    tab=page;
    let gotoPromise=tab.goto("https://www.hackerearth.com/login/");
    return gotoPromise;
 })
 .then(function () { 
     let idTypedPromise=tab.type("#id_login",id);
     return idTypedPromise;
  })
  .then(function (parm) { 
      let pwTypedPromise=tab.type("#id_password",pw);
      return pwTypedPromise;
   })
   .then(function () { 
       let loginPromise=tab.click(".track-login.sign-up-btn-alt");
       return loginPromise;
    })
    .then(function () { 
        let waitAndClickPromise=waitAndClick(".track-header-problems");
        return waitAndClickPromise;
     })
     .then(function () { 
         console.log("scb of trackheader");
         let waitAndClickPromise=waitAndClick('img[src="https://static-fastly.hackerearth.com/static/images/practice_tracks/basic-programming.png"]')
         return waitAndClickPromise;
      })
     .then(function () { 
         console.log("scb of img")
         let waitAndClickPromise=waitAndClick('#practice-problems')
         return waitAndClickPromise;
      })
      .then(function(){
          console.log("scb of practice problms")
          let waitPromise=tab.waitForSelector(".prob-left.float-left a",{visible:true});
          return waitPromise;
      })
      .then(function () { 
          let allAtagsPromise=tab.$$(".prob-left.float-left a");
         return allAtagsPromise;
       })
      .then(function (allATags) { 
          let allLinksPromise=[];
          for(let i=0;i<allATags.length;i++){
            let linkPromise=tab.evaluate(function(elem){
                return elem.getAttribute("href");
            },allATags[i]);
            allLinksPromise.push(linkPromise);
          }
          let pendingPromise=Promise.all(allLinksPromise);
          return pendingPromise;
       })
       .then(function (allLinks) { 
           console.log(allLinks);
           let completeLinks=allLinks.map(function(link){
               return "https://www.hackerearth.com"+link;
           })
           console.log(completeLinks);
        })
 .catch(function (error) {
    console.log(error);
   });



   function waitAndClick(selector){
       return new Promise(function(resolve,reject){
           let waitPromise=tab.waitForSelector(selector , { visible: true,});
           waitPromise.then(function(){
               let clickPromise=tab.click(selector);
               return clickPromise;
           })
           .then(function(){
               resolve();
           })
           .catch(function(error){
               reject(error);
           })
       });
   }