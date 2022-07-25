const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const db = require('../utils/db');
const { MESSAGE_INVALID_CREDENTIALS, MESSAGE_SERVER_ERROR } = require('../utils/constants');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await (await db.query(`SELECT * FROM administrators WHERE email = '${email}'`))[0];

  if (!user) {
    return res.status(400).send(MESSAGE_INVALID_CREDENTIALS);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).send(MESSAGE_INVALID_CREDENTIALS);
  }

  jwt.sign({ user }, config.get('jwtSecret'), { expiresIn: '5 days' }, (error, token) => {
    if (error) {
      console.log('# error => ', error);
      return res.status(500).send(MESSAGE_SERVER_ERROR);
    }
    console.log('# token => ', token);
    return res.status(200).send(token);
  });
};

exports.checkExpirationOfToken = (req, res) => {
  return res.status(200).send(true);
};

exports.getAllWaitingList = async (req, res) => {
  const waitingList = await db.query(`SELECT * FROM waiting_list`);
  return res.status(200).send(waitingList);
};

exports.getAllOrderStatuses = async (req, res) => {
  const orderStatuses = await db.query(`SELECT * FROM order_statuses`);
  return res.status(200).send(orderStatuses);
};

exports.getAllOrders = async (req, res) => {
  const orders = await db.query(`
    SELECT 
      orders.id, 
      orders.wallet_address, 
      orders.email, 
      orders.message, 
      orders.nft_image, 
      orders.name, 
      orders.goal_price, 
      orders.income_price, 
      orders.id_order_status
    FROM orders
  `);
  console.log('# orders => ', orders);
  return res.status(200).send(orders);
};