const puppeteer = require('puppeteer');

const parsePage = async () => {
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto('https://ncov.dxy.cn/ncovh5/view/pneumonia_peopleapp');
    const data = await page.evaluate(() => {
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

module.exports = async (req, res) => {
  try {
    const data = await parsePage();
    res.json({ ...data });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};
