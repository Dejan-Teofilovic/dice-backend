const db = require("./db");

exports.checkOrderExistence = async (walletAddress, nftId) => {
  const order = (await db.query(`
    SELECT * FROM orders WHERE wallet_address = '${walletAddress}' AND nft_id = '${nftId}';
  `))[0];

  if (order) {
    return true;
  } else {
    return false;
  }
};