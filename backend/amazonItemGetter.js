const puppeteer = require("puppeteer");

const getAmazon = async (req, res) => {
  const url = req.body.url;
  const browser = await puppeteer.launch({
    headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
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
        if (price.search(",") !== -1) {
          price = price.split(",").join("");
        }
        price = parseFloat(price);
      }

      if (title && image && price) {
        // Ensure all elements are not null
        items.push({ title, image, price });
      }
    });
    return items;
  });
  await browser.close();
  return res.status(200).json(results.slice(0, 19));
};

module.exports = { getAmazon };
