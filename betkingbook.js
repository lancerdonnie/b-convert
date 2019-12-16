const puppeteer = require('puppeteer-core');
let betk = async () => {
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
  const betcode = 'jjmsr'.toLocaleUpperCase();
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
    var a = document.querySelectorAll('.selection-content');
    a = Array.from(a);
    a.forEach(el => {
      var array = [];
      array.push(el.querySelector('.match-name').textContent);
      array.push(
        el.querySelector('.market-selection').firstElementChild.textContent
      );
      arr.push(array);
    });
    return arr;
  });
  await Context.close();
  await browser.close();
  array = rar;
  return array;
};
let y = betk();
module.exports = y;
