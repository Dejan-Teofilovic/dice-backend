const db = require("../utils/db");
// const transporter = require("../utils/transporter");
const { checkOrderExistence } = require("../utils/functions");
const { SUCCESS, FAILED } = require("../utils/constants");

exports.saveOrder = async (req, res) => {
  const { walletAddress, email, message, nft, name } = req.body;

  console.log('# nft => ', nft);

  const orderExistence = await checkOrderExistence(walletAddress, email, nft.id);

  if (orderExistence) {
    //  If this order is already existed, update it
    db.query(`
      UPDATE orders
      SET message = '${message}', nft = '${JSON.stringify(nft)}'
      WHERE wallet_address = '${walletAddress}' AND email = '${email}' AND nft_id = '${nft.id}' AND name = '${name} AND nft_image = '${nft.image_url}';
    `).then(() => {
      // sendEmailToAdmin(email);
      return res.status(200).send(SUCCESS);
    }).catch(error => {
      console.log('# create error => ', error);
      return res.status(500).send(FAILED);
    });
  } else {
    //  Else create new one.
    db.query(`
      INSERT INTO orders (wallet_address, email, message, nft_id, nft, name, nft_image) 
      VALUES('${walletAddress}', '${email}', '${message}', '${nft.id}', '${JSON.stringify(nft)}', '${name}', '${nft.image_url}');
    `).then(() => {
      // sendEmailToAdmin(email);
      return res.status(201).send(SUCCESS);
    }).catch(error => {
      console.log('# update error => ', error);
      return res.status(500).send(FAILED);
    });
  }
};

// const sendEmailToAdmin = (from) => {
//   const mailOptions = {
//     from: from,
//     to: 'dejanteofilovic2@gmail.com',
//     subject: 'Sending Email using Node.js',
//     text: 'That was easy!'
//   };
//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });
// };