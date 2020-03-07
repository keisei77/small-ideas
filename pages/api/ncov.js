const puppeteer = require('puppeteer');

export default async (req, res) => {
  let allData;
  const parsePage = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://ncov.dxy.cn/ncovh5/view/pneumonia_peopleapp');
    allData = await page.evaluate(() => {
      return { overseas: getListByCountryTypeService2, homeland: getAreaStat };
    });
    await browser.close();
  };

  await parsePage();
  res.json({ ...allData });
};
