const gifts = {
  summer: "T-Shirt",
  autumn: "Coat",
  winter: "Sweater",
  spring: "Shirt",
};

const getSeasonByMonth = (month) => {
  let season;
  if (month <= 2) {
    // Jan, Feb, Mar
    season = "summer";
  } else if (month >= 3 && month <= 5) {
    // Apr, May, Jun
    season = "autumn";
  } else if (month >= 6 && month <= 8) {
    // Jul, Aug, Sep
    season = "winter";
  } else {
    // Oct, Nov, Dec
    season = "spring";
  }
  return season;
};

const generateGift = (dob) => {
  const month = new Date(dob).getMonth();
  const season = getSeasonByMonth(month);
  return gifts[season];
};

module.exports = { generateGift };
