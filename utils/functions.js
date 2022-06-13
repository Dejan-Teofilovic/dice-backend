const db = require("./db");

exports.checkOrderExistence = async (walletAddress, email, nftId) => {
  const order = (await db.query(`
    SELECT * FROM orders WHERE wallet_address = '${walletAddress}' AND email = '${email}' AND nft_id = '${nftId}';
  `))[0];

  if (order) {
    return true;
  } else {
    return false;
  }
};