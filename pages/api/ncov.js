const cheerio = require('cheerio');
export default async (req, res) => {
  const dingXiangDataP = await fetch(
    'https://ncov.dxy.cn/ncovh5/view/pneumonia_peopleapp'
  );
  const dingXiangData = await dingXiangDataP.text();
  const $ = cheerio.load(dingXiangData);
  const allData = $('script')
    .get()
    .filter(script => {
      return !!script.attribs['id'];
    });

  console.log(allData);
  res.json({ allData });
};
