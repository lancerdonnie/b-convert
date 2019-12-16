const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath:
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--auto-open-devtools-for-tabs', '--disable-dev-shm-usage']
  });
  const Context = await browser.createIncognitoBrowserContext();
  const page = await Context.newPage();
  const url1 = 'https://m.betking.com/sports/soccer';
  await page.goto(url1, { timeout: 0 });
  await page.waitForSelector('.quicklinks');
  await page.evaluate(() => {
    var eli = document.querySelectorAll('.ellipsis');
    eli = Array.from(eli);
    // console.log(eli);
    eli.forEach(el => {
      if (el.textContent.trim() == 'All Competitions') el.click();
    });
  });
  let count = 0;
  let total_count = 0;
  const t = await page.evaluate(total_count => {
    total_count = document.querySelectorAll('.checkbox').length;
    return total_count;
  }, total_count);
  for (let i = 0; i <= t; i += 30) {
    await page.evaluate(i => {
      var check = document.querySelectorAll('.checkbox');
      var checks = Array.from(check);
      checks.forEach((check, ind) => {
        if (ind >= i && ind < i + 30) check.click();
      });
      document.querySelectorAll('.label')[1].click();
    }, i);
    await page.waitForSelector('.team-names', { timeout: 0 });
    const names = [
      ['Crystal palace - Brighton', 1],
      ['Bidvest Wits - Mamelodi Sundowns', '1X']
    ];
    var dex = await page.evaluate(names => {
      var a = document.querySelectorAll('.team-names');
      a = Array.from(a);
      let i;
      var b = a.map(el => {
        return el.innerHTML.toString().toLocaleLowerCase();
      });
      names.forEach(name => {
        var numb = [];
        b.forEach(v => {
          var calc = 0;

          name[0]
            .toLocaleLowerCase()
            .split(' ')
            .forEach(s => {
              var p = v.toLocaleLowerCase().match(`.*\\${s}\\b.*`);
              if (p) {
                calc++;
              }
            });
          numb.push(calc);
        });
        i = numb.indexOf(Math.max(...numb));

        switch (name[1]) {
          case 1:
            a[i].nextElementSibling.firstChild.children[0].click();
            break;
          case 2:
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
      });
      return i;
    }, names);
    names.splice(dex, 1);

    console.log(true);
    if (names.length) {
      await page.goBack();
    }
    await page.evaluate(() => {
      document.querySelector('.nav-bar-item.middle').click();
    });
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
  }
})();
