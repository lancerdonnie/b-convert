// avoid css and images
await page.setRequestInterception(true);

page.on('request', req => {
  if (
    req.resourceType() == 'stylesheet' ||
    req.resourceType() == 'font' ||
    req.resourceType() == 'image'
  ) {
    req.abort();
  } else {
    req.continue();
  }
});

//WAIT FOR some seconds after goto
await page.waitFor(15000);
