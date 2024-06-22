const puppeteer = require("puppeteer");

const scrapeAmazon = async (req, res) => {
  const url = req.body.url;
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "domcontentloaded",
  });

  // Wait for the results to show up
  await page.waitForSelector(".s-result-item");

  // Extract the results from the page
  const results = await page.evaluate(() => {
    const items = [];
    document.querySelectorAll(".s-result-item").forEach((item) => {
      const title = item.querySelector("h2 a span")
        ? item.querySelector("h2 a span").innerText
        : null;
      const image = item.querySelector("img.s-image")
        ? item.querySelector("img.s-image").src
        : null;
      const priceElement = item.querySelector(".a-price-whole");
      const priceFraction = item.querySelector(".a-price-fraction");
      let price = null;

      if (priceElement && priceFraction) {
        price = `${priceElement.innerText}.${priceFraction.innerText}`;
        price = price.split("\n.").join("");
      }

      if (title && image && price) {
        // Ensure all elements are not null
        items.push({ title, image, price });
      }
    });
    return items;
  });
  // console.log(results.slice(0, 6));
  await browser.close();
  return res.status(200).json(results.slice(0, 9));
};

module.exports = { scrapeAmazon };
