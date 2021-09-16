const StellarSdk = require("stellar-sdk");

const server = new StellarSdk.Server('https://horizon-testnet.stellar.org')


async function checkBalance(publicKey){

    const account =await Promise.all( [server.loadAccount(publicKey)])
    console.log(account[0].balances)
}

checkBalance('GCZYVBLFKU7VEEBJIUPP7VP53SY4DMDBF3CNSMMAP4U72ZWV6RFF6PGN')

// or with fee
async function checkBalance2(publicKey){

const [
    {
      max_fee: { mode: fee },
    },
    sender,
  ] = await Promise.all([
    server.feeStats(),
    server.loadAccount(publicKey),
  ]);
console.log( [
    {
      max_fee: { mode: fee },
    },
    sender,
  ])
}
checkBalance2('GCZYVBLFKU7VEEBJIUPP7VP53SY4DMDBF3CNSMMAP4U72ZWV6RFF6PGN')