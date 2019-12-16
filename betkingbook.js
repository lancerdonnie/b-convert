const puppeteer = require('puppeteer-core');
let betk = async (betcode = 'JH2K9') => {
  let array = [];
  const browser = await puppeteer.launch({
    executablePath:
      // 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Users\\Mass\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',

    headless: true,
    args: ['--auto-open-devtools-for-tabs', '--disable-dev-shm-usage']
  });
  const Context = await browser.createIncognitoBrowserContext();
  const page = await Context.newPage();
  betcode = betcode.toLocaleUpperCase();
  await page.goto('https://m.betking.com/book-bet');
  await page.waitForSelector('[type="text"]');
  //   await page.evaluate(betcode => {
  //     var a = document.querySelector('[type="text"]');
  //     console.log(a);
  //     a.focus();
  //     a.value = betcode;
  //     document.querySelector('.btn.btn-success').click();
  //   }, betcode);
  await page.type('[type="text"]', betcode);
  await page.evaluate(() => {
    document.querySelector('.btn.btn-success').click();
  });
  //   await page.click('.btn.btn-success');
  await page.waitForSelector('.swal2-confirm.notif-confirm-button', {
    timeout: 0
  });
  await page.click('.swal2-confirm.notif-confirm-button');
  await page.waitForSelector('.selection-container');
  let rar = await page.evaluate(() => {
    const arr = [];
    // var a = document.querySelectorAll('.selection-content');
    var a = document.querySelectorAll('.event-details-container');

    a = Array.from(a);
    a.forEach((el, i) => {
      console.log(el);
      var array = [];
      array.push(document.querySelectorAll('.match-name')[i].textContent);
      array.push(
        document.querySelectorAll('.market-selection')[i].firstElementChild
          .textContent
      );
      arr.push(array);
    });
    return arr;
  });
  await Context.close();
  await browser.close();
  array = rar;
  console.log(array);
  return array;
};
// betk();
let y = betk;
module.exports = y;

//11111s to load
