const puppeteer = require("puppeteer");


const id = "comedy_curcle";
// const id = "zaidkhan5548@gmail.com";

const pw = "zaidkhan554811";
// const pw = "zaidkhan554811";

(async function(){
    try{
        let browser = await puppeteer.launch({
            headless:false,
            defaultViewport:null,
            args:["--start-maximized"],
        });

        let pages=await browser.pages();
        let page=pages[0];
        await page.goto("https://www.instagram.com");
        // await page.goto("https://www.hackerrank.com/auth/login");
        // await page.click(".sqdOP.L3NKy.y3zKF");  //if any account exist before
        await page.waitForSelector('input[name="username"]',{visible:true})
        await page.type('input[name="username"]',id);
        // await page.type('#input-1',id);
        await page.type('input[aria-label="Password"]',pw);
        // await page.type('#input-2',pw);
        await Promise.all([page.waitForNavigation({waitUntil:"networkidle0"}),page.click(".sqdOP.L3NKy.y3zKF")]);
        // await Promise.all([page.waitForNavigation({waitUntil:"networkidle0"}),page.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button")]);
    }catch(error){
        console.log(error);
    }
})();