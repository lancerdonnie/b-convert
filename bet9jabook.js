const puppeteer = require('puppeteer-core');
let betk = async (betcode = 'Z3JP6QHZ') => {
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
  await page.goto('https://old-mobile.bet9ja.com/Schedina.aspx');
  await page.waitForSelector('.lnk.Load');
  await page.type('.TextBox', betcode);
  await page.click('.lnk.Load');
  await page.waitForSelector('.CItems');

  let rar = await page.evaluate(() => {
    const arr = [];

    var a = document.querySelectorAll('.CItem');
    a = Array.from(a);

    a.forEach(el => {
      var array = [];
      array.push(el.querySelector('.CSubEv').firstElementChild.textContent);
      array.push(el.querySelector('.CSegno').childNodes[2].nodeValue.trim());
      arr.push(array);
    });
    return arr;
  });
  console.log(rar);

  await Context.close();
  await browser.close();
  array = rar;
  return array;
};
// let y = betk();
module.exports = betk;
