const { checkOrderExistence } = require("../utils/functions");

exports.createOrder = async (req, res) => {
  const { walletAddress, email, message, nft } = req.body;

  const orderExistence = await checkOrderExistence(walletAddress, nft.id);
  console.log('# orderExistence => ', orderExistence);
};