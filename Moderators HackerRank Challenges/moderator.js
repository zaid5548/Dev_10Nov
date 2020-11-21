const puppeteer = require("puppeteer");


const id = "mapovif924@testbnk.com";
const pw = "12345678";


let tab;

(async function(){
    try{
        let browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"],
          });
        let pages = await browser.pages();
        let page = pages[0];
        await page.goto("https://www.hackerrank.com/auth/login");
        await page.type("#input-1", id);
        await page.type("#input-2", pw); 
        await Promise.all( [ page.waitForNavigation({waitUntil:"networkidle0"}) , page.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button") ]);
        // load => data load
        // domcontentloaded => dom load ho jae
        // networkidle0 => first 500ms after domcontent loaded when there is no requests 
        // networkidle2 => first 500ms where atmost 2 requests sent
        // await page.waitForSelector('a[data-analytics="NavBarProfileDropDown"]' , {visible:true});
        await page.click('a[data-analytics="NavBarProfileDropDown"]'); 
        await Promise.all( [ page.waitForNavigation({waitUntil:"networkidle0"}) , page.click('a[data-analytics="NavBarProfileDropDownAdministration"]')]);
        
        let bothLis = await page.$$('.nav-tabs.nav.admin-tabbed-nav li');
        let manageChallengeLi = bothLis[1];
        await Promise.all( [ page.waitForNavigation({waitUntil:"networkidle0"}) , manageChallengeLi.click()]);
        
       await addModerators();
        
        
        // create challenge
        // await Promise.all( [ page.waitForNavigation({waitUntil:"networkidle0"}) , page.click('.btn.btn-green.backbone.pull-right')]);


    }
    catch(error){
        console.log(error);
    }
})();


async function addModerators(){

     // find all links of the challenges
     await tab.waitForSelector(".backbone.block-center" , {visible:true});
     let allATags = await tab.$$(".backbone.block-center");
     // console.log(allATags.length);
     // [ <a> </a> ,<a> </a> ,<a> </a> ,<a> </a>]
     let allLinks = [];
     for(let i=0 ; i<allATags.length ; i++){
         let link = await tab.evaluate( function(elem){ return elem.getAttribute("href");  }  , allATags[i]);
         let completeLink = "https://www.hackerrank.com"+ link;
         allLinks.push(completeLink);
     }
     console.log(allLinks);

    //start adding moderators to all the challenges parallely

    //after addModerators to all the challenges on one page is done

    // navigate to next page 

    //call addModerators() again

}