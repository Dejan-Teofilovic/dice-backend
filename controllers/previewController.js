const { EMPTY_STRING } = require("../utils/constants");
const db = require("../utils/db");

/**
 * Save user's wallet address and email
 * @param {object} req Request object from frontend
 * @param {object} res Response object to frontend
 * @returns Response object
 */
exports.saveUserdata = async (req, res) => {
  const { walletAddress, email } = req.body;
  const userExisted = await checkUserExistence(walletAddress);

  if (userExisted) {
    return res.status(400).send(EMPTY_STRING);
  } else {
    await db.query(`
      INSERT INTO waiting_list (wallet_address, email) VALUES('${walletAddress}', '${email}');
    `);

    return res.status(201).send(EMPTY_STRING);
  }
};

/**
 * Check whether a user is already existed or not.
 * @param {string} walletAddress The wallet address of a user
 * @returns Boolean - If exist, true. Else false
 */
const checkUserExistence = async (walletAddress) => {
  const userdata = await (await db.query(`
    SELECT * FROM waiting_list WHERE wallet_address = '${walletAddress}'
  `))[0];

  if (userdata) {
    return true;
  } else {
    return false;
  }
};