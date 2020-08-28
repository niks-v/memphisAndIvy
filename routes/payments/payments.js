let Pin = require('pinjs');
require('dotenv').config()

let pin = Pin.setup({
  key: process.env.PAYMENTKEY,
  production: false
});

module.exports = {
    charge : (data) => {
      
    },
    refund : (data) => {

    },
    capture : (data) => {

    },
}