const puppeteer = require('puppeteer-core');
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
  const names = [
    ['Aston Villa - Liverpool', 1],
    ['Everton - Leicester city', 2]
  ];
  //   const names = ['Aston Villa - Liverpool', 'Everton - Leicester city'];
  const url1 =
    'https://web.bet9ja.com/Sport/GroupsExt.aspx?IDSport=590&Antepost=0';
  const url2 = 'https://web.bet9ja.com/Sport/Odds?EventID=';
  //   await page.setUserAgent(
  //     'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
  //   );
  await page.goto(url1, { waitForSelector: '.groupsList' });
  //   await page.waitForSelector();
  let event = [];
  let data = await page.evaluate(
    (event, url2) => {
      let a = document.querySelectorAll('[idevento]');
      b = Array.from(a);
      console.log(b, a);
      console.log(event);
      b.map(div => {
        event.push(div.getAttribute('idevento'));
      });
      event = event.join();
      url2 = url2.concat(event);
      console.log(url2, event);
      return {
        event,
        url2
      };
    },
    event,
    url2
  );
  var search = 'Liverpool Fc Vs Watford Fc'.toLocaleLowerCase().split(' ');
  //   await page.goto(data.url2);

  await page.goto('https://web.bet9ja.com/Sport/Odds?EventID=170880,593685', {
    waitForSelector: '.oddsViewPanel'
  });
  let data2 = await page.evaluate( names => {
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
        case 1:
          //   console.log(
          //     a[i].parentNode
          //       .querySelector('.odds')
          //       .firstElementChild.firstElementChild.firstElementChild.querySelector(
          //         '.odd,  .r1 .c1 .g1 '
          //       )
          //   );
          a[i].parentNode
            .querySelector('.odds')
            .firstElementChild.firstElementChild.firstElementChild.querySelector(
              '.odd,  .r1 .c1 .g1 '
            )
            .click();
          break;
        case 2:
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
    console.log(document.querySelector('#s_w_PC_cCoupon_lnkAvanti'));
     document.querySelector('#s_w_PC_cCoupon_lnkAvanti').click();
  }, names);

  //   await Context.close();
  //   await browser.close();
})();
