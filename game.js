// const puppeteer = require("puppeteer");
const cors=require('cors')
const express = require('express')
const app = express();

// to avoid recapchas
const randomUseragent = require('random-useragent');
// const userAgent = require('user-agents');

    //Enable stealth mode
    const puppeteer = require('puppeteer-extra')
    const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const UserAgent = require('user-agents');
    puppeteer.use(StealthPlugin())
//
const port = 5000;

app.use(cors());
async function getUrls(search) {
  const browser = await puppeteer.launch({
    // headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const url =   "https://www.game.co.za/l/search/?t=";
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(90000);
  console.log(url + search);
  await page.goto(url + search);
  await page.waitForSelector("#react-app");
  const titles = await page.evaluate(() => {
    const selector =      "#react-app > div > div > div > div > div > div > div.css-1dbjc4n.r-13awgt0 > div.css-1dbjc4n.r-1p0dtai.r-6koalj.r-1d2f490.r-12vffkv.r-u8s1d.r-zchlnj.r-ipm5af > div.css-1dbjc4n.r-1p0dtai.r-6koalj.r-1d2f490.r-12vffkv.r-u8s1d.r-zchlnj.r-ipm5af > div.css-1dbjc4n.r-13awgt0.r-12vffkv > div > div > div > div.css-1dbjc4n.r-13awgt0 > div > div > div > div.css-1dbjc4n.r-14lw9ot.r-13awgt0.r-18u37iz.r-13qz1uu > div.css-1dbjc4n.r-13awgt0 > div.css-1dbjc4n.r-150rngu.r-eqz5dr.r-16y2uox.r-1wbh5a2.r-1mnahxq.r-11yh6sk.r-1rnoaur.r-1sncvnh > div > div > div > div > div"
    const titleSelector = "a:nth-child(5)> div"
    const selector2 = " div.css-901oao.r-g3a1by.r-19aw4kv.r-1i10wst.r-vw2c0b.r-knv0ih"
    const data = Array.from(document.querySelectorAll(selector)).map(el => {
      // const title = el.querySelector('a').getAttribute('href');
      const image= el.querySelector('div > div > div > img').getAttribute('src')
      const  price = el.querySelector(selector2).textContent
      const formattedPrice = price.replace('R', '')
      const  name = el.querySelector(titleSelector).textContent
      // console.log(el.jsonValue())
  
       
      return { price: formattedPrice, name, image}
    })
    return data
  })
  await browser.close();
  console.log(titles);
  return titles;
}
async function getSparDetails(search) {
  const browser = await puppeteer.launch({
    // headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  })
  const url = "https://www.pnp.co.za/pnpstorefront/pnp/en/search/?text=";
  const fullUrl = url + search
  console.log(fullUrl);
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(90000);

  await page.goto(fullUrl);
  await page.waitForSelector('main')
  await page.waitForSelector('.carousel-component')
  console.log('got main');
  const products = await page.evaluate(() => {
    console.log('in eval');
    const selector = "body > main > div:nth-child(14) > div > div > div > div > div:nth-child(5) > div > div.carousel-component.fed-prodref-carousel.small-chevron > div > div.owl-stage-outer > div > div > div > div.item.js-product-card-item.product-card-grid"
    const data = Array.from(document.querySelectorAll(selector)).map((el, index) => {
      console.log(index);
      return index
    })
    return data
  })
  console.log('dragg');
  await browser.close()
  return products

  //const selector = "body > main > div:nth-child(14) > div > div > div > div > div:nth-child(5) > div > div.carousel-component.fed-prodref-carousel.small-chevron > div > div.owl-stage-outer > div > div > div > div.item.js-product-card-item.product-card-grid"
}
async function fetchShopriteProducts(search) {
  puppeteer.use(StealthPlugin())
  const userAgent = randomUseragent.getRandom();
  const userAgent2 = UserAgent.random().toString()
  const browser = await puppeteer.launch({
    // headless: false,
    args: ["--no-sandbox", "--disable-setuid--sandbox", "--disable-notifications"]
  })
  const url = "https://www.shoprite.co.za/search/all?q=";
  const fullUrl = url + search;
  const page = await browser.newPage()


  await page.setUserAgent(userAgent2 || userAgent || '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36')
  await page.setDefaultNavigationTimeout(9000000);
  await page.evaluateOnNewDocument(function() {
    navigator.geolocation.getCurrentPosition = function (cb) {
      setTimeout(() => {
        cb({
          'coords': {
            accuracy: 21,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            latitude: 23.129163,
            longitude: 113.264435,
            speed: null
          }
        })
      }, 1000)
    }
  });
  await page.goto(fullUrl);
  await page.waitForSelector('div.search-landing')
  
  const products = await page.evaluate(() => {
    console.log('in eval');
    const selectors = "main > div > div > div:nth-child(1) > div > div > div.row > div > div.product-frame.product-ga > div"
    const selectord = "body > googletagmanager:iframe > main > div.main__inner-wrapper.wrap > div.search-landing > div:nth-child(1) > div > div > div.row > div.search-landing__block__list.col-sm-12.col-md-9 > div.product-frame.product-ga > div"
    const selectora = "body > googletagmanager:iframe > main > div.main__inner-wrapper.wrap > div.search-landing > div:nth-child(1) > div > div > div.row > div.search-landing__block__list.col-sm-12.col-md-9 > div.product-frame.product-ga > div"
    const data = Array.from(document.querySelectorAll(selectors)).map((el, i) => {
      console.log(i);
      const image = el.querySelector('figure > div > a > img').getAttribute('src');
      const name = el.querySelector('figure > figcaption > div.item-product__details > h3 > a').textContent;
      const price = el.querySelector('figure > figcaption > div.item-product__details > div > div > div > span').textContent
      const formattedPrice = price.replace('R','').replace('\n','').trim()
      return { image, name, price: formattedPrice }
    })
    console.log('length: ', data.length);
    return data
  })
  await browser.close()
  return products;
}
async function fetchMakroProducts(search) {
  const browser = await puppeteer.launch({
    // headless: false,
    args: [ "--no-sandbox", "--disable-setuid-sandbox", "--disable-notifications"]
  })
  const url = "https://www.makro.co.za/search/?text=";
  const fullUrl = url + search
  console.log(fullUrl);
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(90000);
  await page.evaluateOnNewDocument(function() {
    navigator.geolocation.getCurrentPosition = function (cb) {
      setTimeout(() => {
        cb({
          'coords': {
            accuracy: 21,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            latitude: 23.129163,
            longitude: 113.264435,
            speed: null
          }
        })
      }, 1000)
    }
  });
  await page.goto(fullUrl);
  await page.waitForSelector('#mak-body-content')
  console.log('got main');
  const products = await page.evaluate(() => {
    console.log('in eval');
    const selector = "#mak-body-content > div.mak-content.mak-plp-grid > div > div.row > div.col-xs-12.no-space > div.col-xs-12.col-xs-push-0.col-md-8.col-md-push-1.productListContainer > div > div > div.mak-product-tiles-container.listview.GRID > div"
    const data = Array.from(document.querySelectorAll(selector)).map((el, index) => {
      console.log(index);
      const image = el.querySelector('a > img').getAttribute('src');
      const name = el.querySelector('div > a > span').textContent.trim();
      const price = el.querySelector('div > p').textContent
      const priceAsArray = price.replace('R','').split('');
      priceAsArray.splice(priceAsArray.length - 2, 0, '.')
      const formattedPrice = priceAsArray.join('').replace(',','').trim()
      return { image, name, price: formattedPrice }
    })
    return data
  })
  console.log('dragg');
  await browser.close()
  return products

  //const selector = "body > main > div:nth-child(14) > div > div > div > div > div:nth-child(5) > div > div.carousel-component.fed-prodref-carousel.small-chevron > div > div.owl-stage-outer > div > div > div > div.item.js-product-card-item.product-card-grid"
}
async function fetchPNPProducts(search) {
  const browser = await puppeteer.launch({
    // headless: false,
    args: [ "--no-sandbox", "--disable-setuid-sandbox", "--disable-notifications"]
  })
  const url = "https://www.pnp.co.za/pnpstorefront/pnp/en/search/?text=";
  const fullUrl = url + search
  console.log(fullUrl);
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(90000);
  await page.evaluateOnNewDocument(function() {
    navigator.geolocation.getCurrentPosition = function (cb) {
      setTimeout(() => {
        cb({
          'coords': {
            accuracy: 21,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            latitude: 23.129163,
            longitude: 113.264435,
            speed: null
          }
        })
      }, 1000)
    }
  });
  await page.goto(fullUrl);
  await page.waitForSelector('.main-container-content')
  console.log('got main');
  const products = await page.evaluate(() => {
    console.log('in eval');
    const selector = "body > main > div:nth-child(14) > div.container.no-space.main-container-content > div > div.col-xs-12.col-md-9 > div:nth-child(3) > div.col-xs-12.col-md-8.no-space > div:nth-child(2) > div > div.col-xs-12.product-list-wrapper > ul > div"
    const data = Array.from(document.querySelectorAll(selector)).map((el, index) => {
      console.log(index);
      const image = el.querySelector('div > div> a > div.thumb >  img').getAttribute('src');
      const name = el.querySelector('div > div > a > div.item-name').textContent;
      const priceString = el.querySelector('div > div > a > div.product-price > div.item-price > div').textContent
      const price = priceString.replace('\n\t\t\tR', '')
      const priceAsArray = price.split('');
      priceAsArray.splice(priceAsArray.length - 2, 0, '.')
      const formattedPrice = priceAsArray.join('').trim()
      // console.log({ priceString, price, priceAsArray, priceNum, formattedPrice });
      console.log('price: ', price);
      console.log('array: ', priceAsArray);
      // console.log('num: ', priceNum);
      // console.log('formatted: ', formattedPrice);
      return { image, name, price: formattedPrice }
      // return index
    })
    return data
  })
  console.log('dragg');
  await browser.close()
  return products

  //const selector = "body > main > div:nth-child(14) > div > div > div > div > div:nth-child(5) > div > div.carousel-component.fed-prodref-carousel.small-chevron > div > div.owl-stage-outer > div > div > div > div.item.js-product-card-item.product-card-grid"
}

// getUrls().then(console.log);
app.get('/', () => {
  
})
const getGameProducts = async(req, res) => {
  console.log('in file')
  console.log(req.query.search);
  const data = await getUrls(req.query.search)
  console.log(data);
  res.send(data)
  
}
const getSparProducts = async(req, res) => {
  const qry = req.query.search;
  const data = await getSparDetails(qry);
  res.send(data)
}
const getShopriteProducts = async(req, res) => {
  const qry = req.query.search;
  const data = await fetchShopriteProducts(qry);
  res.send(data)
}
const getMakroProducts = async(req, res) => {
  const qry = req.query.search
  const data = await fetchMakroProducts(qry)
  res.send(data) 
}
const getPNPProducts = async(req, res) => {
  const qry = req.query.search;
  const data = await fetchPNPProducts(qry);
  res.send(data)
}
app.get('/get-game-products', (req, res) => {
  getGameProducts(req, res);
})

app.get('/get-spar-products', (req, res) => {
  getSparProducts(req, res)
})
app.get('/get-shoprite-products', (req, res) => {
  getShopriteProducts(req, res)
})
app.get('/get-makro-products', (req, res) => {
  getMakroProducts(req, res)
})
app.get('/get-pnp-products', (req, res) => {
  getPNPProducts(req, res)
})
app.listen(process.env.PORT || port, () => {
  console.log('listening on port : ', port);
})
