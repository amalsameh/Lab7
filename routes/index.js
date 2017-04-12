var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongoskin');
const crypto = require('crypto');

var router = express.Router();

var message = '';
/* GET home page. */
router.get('/', function (req, res, next) {
  let decrypted = '';
  var db = mongo.db('mongodb://127.0.0.1:27017/LibraryDB', { native_parser: true });
  db.bind('homework7');
  db.homework7.findOne({}, function (err, doc) {
    if (err) {
      console.log("error");
      throw err;
    }
    message = doc.message;
    console.log("Doc message : " + message);
    console.log(doc);
    db.close();

    const secret = 'asaadsaad';
    const Decipher = crypto.createDecipher('aes256', secret);
    decrypted = Decipher.update(message, 'hex', 'utf8');
    decrypted += Decipher.final('utf8');
    console.log(decrypted);
    res.render('index', { message: decrypted });
  });

  });

module.exports = router;
