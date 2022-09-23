const puppeteer = require("puppeteer");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

// puppeteer.use(StealthPlugin());

const mainPageUrl = "https://www.youtube.com/results?sp=mAEB&search_query=mas+musiq";
const url =   "https://www.game.co.za/l/search/?t=maize%20meal&q=maize%20meal%3Arelevance";
async function getUrls() {
  const browser = await puppeteer.launch({
    // headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(60000);
  await page.goto(url);
  await page.waitForSelector("#react-app");
  const titles = await page.evaluate(() => {
    const selector = "#react-app > div > div > div > div > div > div > div.css-1dbjc4n.r-13awgt0 > div > div.css-1dbjc4n.r-1p0dtai.r-6koalj.r-1d2f490.r-12vffkv.r-u8s1d.r-zchlnj.r-ipm5af > div.css-1dbjc4n.r-13awgt0.r-12vffkv > div > div > div > div.css-1dbjc4n.r-13awgt0 > div > div > div > div.css-1dbjc4n.r-14lw9ot.r-13awgt0.r-18u37iz.r-13qz1uu > div.css-1dbjc4n.r-13awgt0 > div.css-1dbjc4n.r-150rngu.r-eqz5dr.r-16y2uox.r-1wbh5a2.r-1mnahxq.r-11yh6sk.r-1rnoaur.r-1sncvnh > div > div > div > div > div"
    const data 
    = Array.from(document.querySelectorAll(selector)).map(el => {
      console.log(el);
      const title = el.querySelector('a').getAttribute('href');
      // console.log(title);
      return title
      // return el.getAttribute('title')
    })
    return data
  })
  await browser.close();
  return titles;
}

getUrls().then(console.log);