// grab a screenshot
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:4200/profile/1/demographic?charts=false&reliability=true');
  await page.waitForSelector('h3#sex-and-age');
  await page.screenshot({ path: 'latest.png', fullPage: true });

  await browser.close();
})();
