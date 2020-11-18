const puppeteer = require('puppeteer');


//puppeteer function=> pending promise
id="koxes42892@pidouno.com";
pw="Z@id0554811khan";

let tab;

// puppeteer functions => pending promise

// initialize a new browser window 
let windowOpenPromise = puppeteer.launch({
    headless:false,
    defaultViewport: null,
    args : ["--start-maximized"]
});

windowOpenPromise.then(function (browser) {  

    let pagesPromise=browser.pages();
    return pagesPromise;

})

.then(function name(pages) {
    let page=pages[0];
    tab=page;

    let gotoPromise=page.goto("https://www.hackerrank.com/auth/login");
    return gotoPromise;
})
.then(function () {  
    let idTypedPromices=tab.type("#input-1",id);
    return idTypedPromices;
})
.then(function(){
    let pwTypedPromices=tab.type("#input-2",pw);
    return pwTypedPromices;
})

.then(function () { 
    let loginPromice=tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button");
    return loginPromice;
 })
 .then(function () { 
     console.log("logged In!!!");
  })