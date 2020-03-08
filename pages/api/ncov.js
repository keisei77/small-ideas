const puppeteer = require('puppeteer');

const parsePage = async () => {
  let data;
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://ncov.dxy.cn/ncovh5/view/pneumonia_peopleapp');
    data = await page.evaluate(() => {
      return {
        overseas: getListByCountryTypeService2,
        homeland: getAreaStat
      };
    });
    await browser.close();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export default async (req, res) => {
  try {
    const data = await parsePage();
    res.json({ ...data });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};
