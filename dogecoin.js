var dogecoin = require('node-dogecoin')(
    {
        "rpchost": "127.0.0.1",
        "rpcport": 22555,
        "rpcuser": "testnet",
        "rpcpassword": "testnet"
    }
)
 
dogecoin.auth('himmmm', 'mypassword1111')
 
dogecoin.getDifficulty(function() {
    console.log(arguments);
})