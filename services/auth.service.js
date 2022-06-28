const dev_config = (process.env.store === undefined) ? require('../devConfig') : undefined;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function validateLogin(reqUser, cb) {
  try {
    // prevent injection here if using DB
    bcrypt.compare(reqUser.pass/*clinet pass*/, process.env.yourHash || dev_config.yourHash/* todo get hashed password from db or other source*/, function (err, result) {
      if (err) {
        cb(err);
      } else if (result === true) {
        const at_secret = process.env.at_secret || dev_config.at_secret; // todo change to tour secret var name
      const accessToken = jwt.sign({ user: user /*user details if need*/ }, at_secret, { expiresIn: 60 * 60 }); 
        cb(null, accessToken)
      } else {
        cb(null, false)
      }
    });

  } catch (err) {
    cb(err);
  }
}

function validateAccess(at, cb) {
  const at_secret = process.env.atSecret || dev_config.atSecret;
  jwt.verify(at, at_secret, function (err, decoded) {
    if (err) {
      cb(err);
      return;
    }
    if (decoded.user) {
      cb(null, true);
    }
  });
}

module.exports = { validateLogin, validateAccess };