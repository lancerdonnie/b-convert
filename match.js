const res = (match, array) => {
  var match = match.toLocaleLowerCase();
  var array = array;
  // const names = 'Liverpool - Watford'.toLocaleLowerCase().split(' ');
  // const n = 'Liverpool - fatford'.toLocaleLowerCase().split(' ');
  // const arr = [names, n];
  // const o = 'Liverpool Fc Vs Watford Fc'.toLocaleLowerCase();
  var num = [];

  const find = (match = match, array = array) => {
    match.forEach(f => {
      var wordCount = 0;
      f.forEach(e => {
        var i = array.textContent.match(`.*\\${match}\\b.*`);
        if (i) wordCount++;
      });
      num.push(wordCount);
    });
    let i = num.indexOf(Math.max(...num));
    return array[i];
  };

  return find();
};
