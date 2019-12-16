// const axios = require('axios');

const ele = document.querySelector('#form');
let from = document.querySelector('#from').value;
let to = document.querySelector('#to').value;
let inp = document.querySelector('#inp').value;
let ans = '';
document.querySelector('#to').addEventListener('change', e => {
  to = e.target.value;
});
document.querySelector('#from').addEventListener('change', e => {
  from = e.target.value;
});
document.querySelector('#inp').addEventListener('change', e => {
  inp = e.target.value;
});

if (ele.addEventListener) {
  ele.addEventListener(
    'submit',
    async e => {
      e.preventDefault();
      const code = inp;
      (async () => {
        const bd = { from, to, code };
        try {
          raw = await fetch('http://localhost:3000/api', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(bd)
          });
          ans = await raw.text();
          document.querySelector('#ans').innerText = ans;
          document.querySelector('#ans').style.display = 'block';
        } catch (error) {
          console.log(error);
        }
      })();
    },
    false
  );
}
