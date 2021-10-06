
const https = require('https');

var options = {
  "method": "GET",
  "hostname": "api.cryptoapis.io",
  "path": "/v1/bc/doge/testnet/address/nWeCPunApNrYzjaEhw4dARQQ258PVFa95A",
  "headers": {
    "Content-Type": "application/json",
    "X-API-Key": "fb8d07ed257a0e54867a085c4c7f719a03ac1d52"
  }
};

var request = https.request(options, function (response) {
  response.on("data", function (data) {
    console.log(data.toString());
  });
});

request.end();