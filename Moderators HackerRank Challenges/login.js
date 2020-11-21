const puppeteer=require('puppeteer');
const challenges = require('../Challenges Hackerrank Submit/activity/challenges');

const id="koxes42892@pidouno.com";
const pw="Z@id0554811khan";

(async function(){
    try{
        let browser=await puppeteer.launch({
            headless:false,
            defaultViewport:null,
            args:["--start-maximized"],
        });
        let pages=await browser.pages();
        let page=pages[0];
        await page.goto("https://www.hackerrank.com/auth/login");
        await page.type("#input-1",id);
        await page.type("#input-2",pw);
        await Promise.all([page.waitForNavigation({waitUntil:'networkidle0'}),page.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button")]);
        
        await page.click('a[data-analytics="NavBarProfileDropDown"]'); 
        await Promise.all( [ page.waitForNavigation({waitUntil:"networkidle0"}) , page.click('a[data-analytics="NavBarProfileDropDownAdministration"]')]);
         
        let bothLis = await page.$$('.nav-tabs.nav.admin-tabbed-nav li');
        let manageChallengeLi = bothLis[1];
        await Promise.all( [ page.waitForNavigation({waitUntil:"networkidle0"}) , manageChallengeLi.click()]);
        
        await page.click('.btn.btn-green.backbone.pull-right');

        addChallenge(newtab,challenges[0]);

    }catch(error){
        console.log(error);
    }
})();


async function addChallenge(tab,challenge){
    // "Challenge Name": "Pep_Java_1GettingStarted_1IsPrime",
    //   "Description": "Question 1",
    //   "Problem Statement": "Take as input a number n. Determine whether it is prime or not. If it is prime, print 'Prime' otherwise print 'Not Prime.",
    //   "Input Format": "Integer",
    //   "Constraints": "n <= 10 ^ 9",
    //   "Output Format": "String",
    //   "Tags": "Basics",

    let challengeName=challenge["Challenge Name"];
    let description=challenge["Description"];
    let problemStatement=challenge["Problem Statement"];
    let inputFormat=challenge["Input Format"];
    let constraints=challenge["Constraints"];
    let outputFormat=challenge["Output Format"];
    let tags=challenge["Tags"];

    await tab.goto("https://www.hackerrank.com/administration/challenges/create");
    await tab.waitForSelector("#name" , {visible:true});
    await tab.type("#name",challengeName);
    await tab.type("#preview" , description);
    await tab.type("#problem_statement-container .CodeMirror textarea" , probStatement);
    await tab.type("#input_format-container .CodeMirror textarea" , inputFormat);
    await tab.type("#constraints-container .CodeMirror textarea" , constrains);
    await tab.type("#output_format-container .CodeMirror textarea" , outputFormat);
    await tab.type("#tags_tag" , tags);
    await tab.keyboard.press("Enter");
    await tab.click(".save-challenge.btn.btn-green");
    await tab.close();
}