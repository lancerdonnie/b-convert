const puppeteer = require('puppeteer-core');
// const betkingbook = require('./betkingbook'); //async
// const e = async () => {
//   console.log(await betkingbook);
// };
// e();
(async () => {
  const browser = await puppeteer.launch({
    executablePath:
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    headless: false,
    args: ['--auto-open-devtools-for-tabs', '--disable-dev-shm-usage']
  });
  const Context = await browser.createIncognitoBrowserContext();
  //   console.info(browser);
  const page = await Context.newPage();
  //https://web.bet9ja.com/Sport/GroupsExt.aspx?IDSport=590&Antepost=0
  //https://web.bet9ja.com/Sport/Odds?EventID=170880
  //https://web.bet9ja.com/Sport/Odds?EventID=170880,593685

  //document.querySelector([""])
  // const names = await betkingbook;
  const names = [
    ['Crystal Palace - Brighton', '1'],
    ['Bidvest Wits - Mamelodi Sundowns', '1X']
  ];
  const url1 =
    'https://web.bet9ja.com/Sport/GroupsExt.aspx?IDSport=590&Antepost=0';
  const url2 = 'https://web.bet9ja.com/Sport/Odds?EventID=';
  //   await page.setUserAgent(
  //     'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
  //   );
  // await page.goto(url1, { waitForSelector: '.groupsList', timeout: 0 });
  // //   await page.waitForSelector();
  // let event = [];
  // let data = await page.evaluate(
  //   (event, url2) => {
  //     let a = document.querySelectorAll('[idevento]');
  //     b = Array.from(a);
  //     console.log(b, a);
  //     console.log(event);
  //     b.map(div => {
  //       event.push(div.getAttribute('idevento'));
  //     });
  //     event = event.join();
  //     url2 = url2.concat(event);
  //     console.log(url2, event);
  //     return {
  //       event,
  //       url2
  //     };
  //   },
  //   event,
  //   url2
  // );
  //   await page.goto(data.url2);
  // await page.setRequestInterception(true);

  // page.on('request', req => {
  //   if (
  //     req.resourceType() == 'stylesheet' ||
  //     req.resourceType() == 'font' ||
  //     req.resourceType() == 'image'
  //   ) {
  //     req.abort();
  //   } else {
  //     req.continue();
  //   }
  // });
  await page.goto(
    'https://web.bet9ja.com/Sport/Odds?EventID=170880,180962',
    // data.url2,
    {
      waitForSelector: '.oddsViewPanel',
      timeout: 0
    }
  );
  console.log(true);
  let data2 = await page.evaluate(names => {
    var a = document.querySelectorAll('[ng-bind-html]');
    var b = Array.from(a);
    names.forEach(name => {
      var numb = [];
      b.forEach(v => {
        var calc = 0;
        name[0]
          .toLocaleLowerCase()
          .split(' ')
          .forEach(s => {
            var p = v.textContent.toLocaleLowerCase().match(`.*\\${s}\\b.*`);
            if (p) calc++;
          });
        numb.push(calc);
      });
      let i = numb.indexOf(Math.max(...numb));
      switch (name[1]) {
        case '1':
          a[i].parentNode
            .querySelector('.odds')
            .firstElementChild.firstElementChild.firstElementChild.querySelector(
              '.odd,  .r1 .c1 .g1 '
            )
            .click();
          break;
        case '2':
          a[i].parentNode
            .querySelector('.odds')
            .firstElementChild.firstElementChild.firstElementChild.querySelector(
              'div .odd + .c3'
            )
            .click();
          break;
        case 'X':
          a[i].parentNode
            .querySelector('.odds')
            .firstElementChild.firstElementChild.firstElementChild.querySelector(
              'div .odd + .c2'
            )
            .click();
          break;
        case '1X':
          a[i].parentNode
            .querySelector('.odds')
            .firstElementChild.firstElementChild.children[1].querySelector(
              'div .odd + .r1 ,.c4'
            )
            .click();
          break;
        case '12':
          a[i].parentNode
            .querySelector('.odds')
            .firstElementChild.firstElementChild.children[1].querySelector(
              'div .odd + .r1 ,.c5'
            )
            .click();
          break;
        case 'X2':
          a[i].parentNode
            .querySelector('.odds')
            .firstElementChild.firstElementChild.children[1].querySelector(
              'div .odd + .r1 ,.c6'
            )
            .click();
          break;
        default:
          break;
      }
    });
  }, names);
  await page.waitForSelector('#s_w_PC_cCoupon_lnkAvanti');
  await page.evaluate(() => {
    document.querySelector('#s_w_PC_cCoupon_lnkAvanti').click();
    console.log(
      'clicked',
      document
        .querySelector('#iframePrenotatoreSco')
        .contentDocument.getElementById('bookHead')
    );
  });
  await page.waitForSelector('#iframePrenotatoreSco');
  await page.waitFor(2000);
  // let frames = await page.frames().find(frame => frame.name() === 'iframePrenotatoreSco')
  // console.log(frames);
  const result = await page.evaluate(() => {
    var iframe = document.querySelector('#iframePrenotatoreSco');
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    //Booking number
    console.log(innerDoc.firstElementChild.textContent);
    return innerDoc.firstElementChild.textContent;
  });
  console.log(result);

  //   await Context.close();
  //   await browser.close();
})();
