const puppeteer = require('puppeteer-core');
const bet9jabook = require('./bet9jabook'); //async

(async () => {
  const browser = await puppeteer.launch({
    executablePath:
      // 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Users\\Mass\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',

    headless: false,
    args: ['--auto-open-devtools-for-tabs', '--disable-dev-shm-usage']
  });
  const Context = await browser.createIncognitoBrowserContext();
  const page = await Context.newPage();
  const url1 = 'https://m.betking.com/sports/soccer';
  const url2 =
    'https://m.betking.com/sports/events/prematch/soccer/england/eng-premier-league';
  await page.goto(url1);
  await page.waitForSelector('.quicklinks');
  await page.evaluate(() => {
    var eli = document.querySelectorAll('.ellipsis');
    eli = Array.from(eli);
    eli.forEach(el => {
      if (el.textContent.trim() == 'All Competitions') el.click();
    });
  });

  await page.evaluate(() => {
    var check = document.querySelectorAll('.checkbox');
    var checks = Array.from(check);
    checks.forEach(check => {
      check.click();
    });
    document.querySelectorAll('.label')[1].click();
  });

  // await page.goto(url2, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.team-names');
  // const names = [
  //   ['Crystal palace - Brighton', 1],
  //   ['Bidvest Wits - Mamelodi Sundowns', '1X']
  // ];
  const names = await bet9jabook;
  await page.evaluate(names => {
    var a = document.querySelectorAll('.team-names');
    a = Array.from(a);
    var b = a.map(el => {
      return el.innerHTML.toString().toLocaleLowerCase();
    });
    names.forEach(name => {
      console.log('iteration');
      var numb = [];
      b.forEach(v => {
        var calc = 0;

        name[0]
          .toLocaleLowerCase()
          .split(' ')
          .forEach(s => {
            var p = v.toLocaleLowerCase().match(`.*\\${s}\\b.*`);
            if (p) calc++;
          });
        numb.push(calc);
      });
      let i = numb.indexOf(Math.max(...numb));
      switch (name[1]) {
        case '1':
          a[i].nextElementSibling.firstChild.children[0].click();
          break;
        case '2':
          a[i].nextElementSibling.firstChild.children[2].click();
          break;
        case 'X':
          a[i].nextElementSibling.firstChild.children[1].click();
          break;
        case '1X':
          document
            .querySelector('[appselectedtabcenterizer]')
            .children[1].click();
          a[i].nextElementSibling.firstChild.children[0].click();
          document
            .querySelector('[appselectedtabcenterizer]')
            .children[0].click();
          break;
        case '12':
          document
            .querySelector('[appselectedtabcenterizer]')
            .children[1].click();
          a[i].nextElementSibling.firstChild.children[1].click();
          document
            .querySelector('[appselectedtabcenterizer]')
            .children[0].click();
          break;
        case 'X2':
          document
            .querySelector('[appselectedtabcenterizer]')
            .children[1].click();
          a[i].nextElementSibling.firstChild.children[2].click();
          document
            .querySelector('[appselectedtabcenterizer]')
            .children[0].click();
          break;
        default:
          break;
      }
      document.querySelector('.nav-bar-item.middle').click();
    });
  }, names);
  await page.waitForSelector('.btn-warning');
  await page.evaluate(() => {
    document.querySelector('.btn.btn-warning').click();
    console.log(document.querySelectorAll('.value')[0]);
  });
  await page.waitForSelector('.booked.header');
  var result = await page.evaluate(() => {
    console.log(document.querySelectorAll('.value')[0].textContent);
    return document.querySelectorAll('.value')[0].textContent;
  });
  console.log(result);
})();
